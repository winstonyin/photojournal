const fs = require('fs')
const path = require('path')

const ALBUMS_PATH = './public/content/albums'

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
        cover: child_entries[0].cover, // default to cover of first child
        hidden: false,
        order: child_directories.map((c, i) => ({name: c.name, title: child_entries[i].title}))
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
      albums: config.order.map((c, i) => ({
        url: p.substring(16) + "/" + c.name,
        title: c.title,
        cover: child_entries[i].cover,
        n_albums: child_entries[i].length,
        n_photos: child_entries[i].n_photos
      })),
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

// console.log(compileAlbums(ALBUMS_PATH, []))
let data = JSON.stringify(compileAlbums(ALBUMS_PATH, [])[1], null, 2);
fs.writeFileSync('data/albums.json', data);