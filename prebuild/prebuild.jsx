const fs = require('fs')
const path = require('path')

const ALBUMS_PATH = './public/content/albums'
const POSTS_PATH = './public/content/posts'

function isImage(dirent) {
  return dirent.isFile() && ['.jpg', '.png', '.webp'].includes(path.extname(dirent.name).toLowerCase())
}

function direntKind(contents) {
  // returns true if only contains directories, false if only contains images, otherwise throws error
  let hasFile = false
  let hasDirectory = false
  for (c of contents) {
    if (isImage(c)) {hasFile = true}
    if (c.isDirectory()) {hasDirectory = true}
    if (hasFile && hasDirectory) {
      throw new Error('Directory ' + c.path + '/' + c.name + ' contains a mixture of directory and image. Images can only be in leaves.')
    }
  }
  if (!hasFile && !hasDirectory) {
    throw new Error('Directory ' + c.path + '/' + c.name + ' contains no directories or images.')
  }
  return hasDirectory // hasFile is always opposite
}

function processAlbumConfig(p, contents) {
  // read from config file in directory p or write default config file
  let config_file = p + "/config.json"
  if (fs.existsSync(config_file)) {
    var config = JSON.parse(fs.readFileSync(config_file))
  } else {
    var config = {
      title: path.basename(p) == "albums" ? "All Albums" : path.basename(p),
      cover: contents.find(c => isImage(c)).name, // default to first image
      hidden: false,
      order: contents.filter(c => isImage(c)).map(c => ({name: c.name, desc: ""}))
    }
    let data = JSON.stringify(config, null, 2);
    fs.writeFileSync(config_file, data);
  }
  return config
}

function albumEntry(p, contents) {
  // info about the current directory (full of images) to be passed to the parent
  let config = processAlbumConfig(p, contents)
  return {
    kind: 0,
    url: p.substring(16),
    title: config.title,
    cover: p.substr(8) + "/" + config.cover,
    images: config.order.map(c => ({
      src: p.substring(8) + "/" + c.name,
      desc: c.desc
    })),
    n_photos: config.order.length
  }
}

function compileAlbums(p, albums) {
  // return the data object about the current directory p and the accumulated flat array
  // p is the path of the current directory ./content/albums/...
  // albums is the flat array of directories
  const contents = fs.readdirSync(p, {withFileTypes: true})
  if (direntKind(contents)) {
    // is full of directories
    let child_directories = contents.filter(c => c.isDirectory())
    // the recursive part
    let child_entries = child_directories.map(c => {
      let a
      // first component is information passed up the recursion from the leaves
      // second component is the outward facing flat array, to be read by React
      // first component might have more detailed information than second component
      [a, albums] = compileAlbums(c.path + "/" + c.name, albums)
      return a
    })
    // read or write default config file per directory
    let config_file = p + "/config.json"
    if (fs.existsSync(config_file)) {
      var config = JSON.parse(fs.readFileSync(config_file))
    } else {
      var config = {
        title: path.basename(p) == "albums" ? "All Albums" : path.basename(p),
        cover: path.basename(p) == "albums" ? "" : child_entries[0].cover, // default to cover of first child
        hidden: false,
        order: child_directories.map(c => c.name)
      }
      let data = JSON.stringify(config, null, 2);
      fs.writeFileSync(config_file, data);
    }
    // first component (internal recursive info) from config
    let directory_entry = {
      kind: 1,
      url: p.substring(16),
      title: config.title,
      cover: config.cover,
      albums: config.order.map(c => {
        let url = p.substring(16) + "/" + c
        let entry = child_entries.find(d => d.url == url) // to get the right order
        return {
          url: url,
          title: entry.title,
          cover: entry.cover,
          n_albums: entry.length,
          n_photos: entry.n_photos
        }
      }),
      n_albums: config.order.length,
      n_photos: child_entries.map(c => c.n_photos).reduce((sum, a) => sum + a, 0)
    }
    // second component (exposed to React)
    albums.push({
      kind: directory_entry.kind,
      url: directory_entry.url,
      title: directory_entry.title,
      albums: directory_entry.albums
    })
    return [directory_entry, albums]
  } else {
    // is full of images
    // first component
    let album_entry = albumEntry(p, contents)
    // second component
    albums.push({
      kind: album_entry.kind,
      url: album_entry.url,
      title: album_entry.title,
      images: album_entry.images
    })
    return [album_entry, albums]
  }
}

function isPost(dirent) {
  return dirent.isFile() && path.extname(dirent.name).toLowerCase() == '.md'
}

function processPost(dirent) {
  let post = fs.readFileSync(dirent.path + '/' + dirent.name).toString()
  // extract title, date, directory nicknames
  // HOW DO CAPTURE GROUPS WORK HERE?
  const title = post.match(/title:\s*(.+)/)
  const date = post.match(/date:\s*(\d\d\d\d)\-(\d\d)\-(\d\d)/)
  const dirs = post.match(/directory:\s*\[.+\]\(.+\)/g)
  // replace directory nicknames by actual paths within <gallery> tags only
  // count number of photos
  let n_photos = 0
  post = post.replace(/<gallery>.+?<\/gallery>/gs, m => {
    for (d of dirs) {
      let dict = d.match(/\[(.+)\]\((.+)\)/)
      let regex = new RegExp('^(\\*|)' + dict[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gm') // auto escape characters
      let replace = '$1' + dict[2].replace(/\$/g, '$$$$') // escape dollar signs
      m = m.replace(regex, replace)
      m = m.replace(/\n+/g, '\n')
      n_photos += m.match(/\/content\/albums\/.+/g).length
    }
    return m
  })
  // featured photo
  featured_match = post.match(/<gallery>.*?\n\*(.+?)\n.*?<\/gallery>/s)
  let featured = featured_match ? featured_match[1] : post.match(/<gallery>\n+(.+?)\n/s)[1] // get first image if not manually set
  post = post.replace(/(<gallery>.*?\n)\*(.+?)(\n.*?<\/gallery>)/s, '$1$2$3')
  // remove config lines and multiple empty lines from post
  // <gallery> -> <Gallery>
  post = post.replace(/title:\s*.+/, '')
    .replace(/date:\s*\d\d\d\d\-\d\d\-\d\d/, '')
    .replace(/directory:\s*\[.+\]\(.+\)/g, '')
    .replace(/\n\n+/gs, '\n\n') // empty lines
    .replace(/^\n+/s, '') // leading newline
    .replace(/gallery>/g, 'Gallery>')
  // generate blurb by removing tags
  let blurb = post.replace(/(^#.+?$|<Gallery>.+?<\/Gallery>|\n)/gms, '').substring(0, 200)
  return {
    name: dirent.name.substr(0, dirent.name.length-3),
    title: title[1],
    date: date[1] + date[2] + date[3],
    featured: featured,
    post: post,
    n_photos: n_photos,
    blurb: blurb
  }
}

function compilePosts(p) {
  // process posts into proper markdown, extract config parameters
  // return data
  return fs.readdirSync(p, {withFileTypes: true}).filter(isPost).map(processPost).sort((a, b) => b.date - a.date)
}

let album_data = JSON.stringify(compileAlbums(ALBUMS_PATH, [])[1], null, 2);
fs.writeFileSync('data/albums.json', album_data);

let post_data = JSON.stringify(compilePosts(POSTS_PATH), null, 2);
fs.writeFileSync('data/posts.json', post_data)