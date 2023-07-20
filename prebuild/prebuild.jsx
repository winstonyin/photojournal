const fs = require('fs')
const path = require('path')

const ALBUMS_PATH = './public/content/albums'

function isImage(dirent) {
  return dirent.isFile() && ['.jpg', '.png', '.webp'].includes(path.extname(dirent.name).toLowerCase())
}

function imageEntry(dirent, i) {
  // dirent here must be an image
  return {
    src: dirent.path.substring(8) + '/' + dirent.name,
    i: i
  }
}

function albumEntry(p, contents) {
  // dirent here must be a directory full of images
  let images = []
  let i = 0
  for (c of contents) {
    if (isImage(c)) {
      images.push(imageEntry(c, i))
      i++
    }
  }
  let title = path.basename(p)
  return {
    kind: 0,
    url: p.substring(8),
    cover: images[0].src,
    title: title,
    images: images,
    n_photos: i
  }
}

function directoryEntry(p, contents, n_photos, covers) {
  // dirent here must be a directory full of directories
  let albums = []
  let i = 0
  for (c of contents) {
    if (c.isDirectory()) {
      albums.push({
        url: c.path.substring(8) + '/' + c.name,
        title: c.name,
        cover: covers[i],
        i: i,
        n_photos: n_photos[i]
      })
      i++
    }
  }
  let title = path.basename(p) == "albums" ? "All Albums" : path.basename(p)
  return {
    kind: 1,
    url: p.substring(8),
    title: title,
    cover: covers[0],
    albums: albums,
    n_albums: i,
    n_photos: n_photos.reduce((sum, a) => sum + a, 0)
  }
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

function processConfig(p, contents, cover) {
  let config_file = p + "/config.json"
  if (fs.existsSync(config_file)) {
    console.log(config_file + " exists!")
  } else {
    let config = {
      title: path.basename(p) == "albums" ? "All Albums" : path.basename(p),
      cover: cover.substr(p.length-8), // relative path from p
      hidden: false,
      order: contents.filter(c => isImage(c) || c.isDirectory()).map(c => ({name: c.name, desc: ""}))
    }
    let data = JSON.stringify(config, null, 2);
    fs.writeFileSync(p + '/config.json', data);
  }
}

function compileAlbums(p, albums) {
  albums = albums || []
  const contents = fs.readdirSync(p, {withFileTypes: true})
  if (direntKind(contents)) {
    // is full of directories
    let n_photos = []
    let covers = []
    for (c of contents) {
      if (c.isDirectory()) {
        albums = compileAlbums(c.path + '/' + c.name, albums)
        n_photos.push(albums[albums.length-1].n_photos)
        covers.push(albums[albums.length-1].cover)
      }
    }
    processConfig(p, contents, covers[0])
    albums.push(directoryEntry(p, contents, n_photos, covers))
  } else {
    // is full of images
    let first_image = contents.find(c => isImage(c))
    processConfig(p, contents, first_image.path.substring(8) + '/' + first_image.name)
    albums.push(albumEntry(p, contents))
  }
  return albums
}
 
let data = JSON.stringify(compileAlbums(ALBUMS_PATH), null, 2);
// fs.writeFileSync('data/albums.json', data);