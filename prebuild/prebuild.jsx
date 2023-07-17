const fs = require('fs')
const path = require('path')

const ALBUMS_PATH = './public/content/albums'

function isImage(dirent) {
  return ['.jpg', '.png', '.webp'].includes(path.extname(dirent.name).toLowerCase())
}

function imageEntry(dirent, i) {
  // dirent here must be an image
  return {
    src: dirent.path.substring(8) + '/' + dirent.name,
    i: i
  }
}

function albumEntry(dirent, i) {
  // dirent here must be a directory
  const contents = fs.readdirSync(dirent.path + '/' + dirent.name, {withFileTypes: true})
  let images = []
  let j = 0
  for (c of contents) {
    if (isImage(c)) {
      images.push(imageEntry(c, j))
      j++
    }
  }
  return {
    url: dirent.path.substring(8) + '/' + dirent.name,
    title: dirent.name,
    i: i,
    images: images,
    total: j
  }
}

function compileAlbums(p) {
  // dirent contains a bunch of directories
  const contents = fs.readdirSync('./public/content/albums', {withFileTypes: true})
  let albums = []
  let i = 0
  for (c of contents) {
    if (c.isDirectory()) {
      albums.push(albumEntry(c, i))
      i++
    }
  }
  return albums
}

// console.log(compileAlbums(ALBUMS_PATH))

// .filter(item => !item.isDirectory())
// .map(item => item.name)
 
let data = JSON.stringify(compileAlbums(ALBUMS_PATH), null, 2);

fs.writeFileSync('data/albums.json', data);