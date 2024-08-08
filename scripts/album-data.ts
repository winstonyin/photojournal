import fs from "fs"
import path from "path"
import sharp from "sharp"
import config from "../site-config.json"
import { isRedirectError } from "next/dist/client/components/redirect"

// one entry of /data/albums.json
export type AlbumData = {
  is_leaf: boolean
  url: string // absolute album path /albums/...
  title: string
  breadcrumb: string[] // titles of parents
  // cover: string // absolute photo src /content/albums/...
  subalbums?: {
    url: string // absolute album path /albums/...
    title: string
    cover: string // absolute photo src /content/albums/...
    count: number
  }[]
  photos?: {
    src: string
    desc: string
    // hidden?: boolean
  }[]
}

// content of config.json in each subdirectory
type AlbumConfig = {
  title: string
  cover: string // relative path to cover photo or ""
  photos?: {
    filename: string,
    desc: string
  }[]
  subalbums?: string[]
}

function isLeaf(contents: fs.Dirent[]) {
  // false if contents contain directories
  for (let c of contents) {
    if (c.isDirectory()) {
      return false
    }
  }
  return true
}

function pathToURL(p: string, trim: number) {
  // assumes ./public/content/albums/[more_path]
  // returns /albums/[more_path] for trim=3
  return "/" + p.split(path.sep).slice(trim).join("/")
}

function isImage(d: fs.Dirent) {
  return d.isFile() && [".jpg", ".png", ".webp"].includes(path.extname(d.name).toLowerCase())
}

async function generateThumbnail(src: string, s: number, fit: keyof sharp.FitEnum, new_path: string) {
  await sharp('./public' + src).resize(s, s, {fit: fit}).webp().toFile(new_path)
  return {src: src, s: s}
}

async function processImage(src: string) {
  const base_path = "./public/img" + pathToURL(src, 3)
  const ext = path.extname(base_path)
  for (let s of config.thumb_sizes) {
    const new_path = base_path.substring(0, base_path.length - ext.length) + "-" + s + ".webp"
    if (!fs.existsSync(new_path)) {
      await generateThumbnail(src, s, "cover", new_path)
        .then(r => console.log("Generated size " + r.s + "px for " + r.src))
    }
  }
  for (let s of config.full_sizes) {
    const new_path = base_path.substring(0, base_path.length - ext.length) + "-" + s + ".webp"
    if (!fs.existsSync(new_path)) {
      await generateThumbnail(src, s, "inside", new_path)
        .then(r => console.log("Generated size " + r.s + "px for " + r.src))
    }
  }
}

const sortAlphaNum = (a: string, b: string) => a.localeCompare(b, "en", {numeric: true})
const sortFiles = (a: fs.Dirent, b: fs.Dirent) => sortAlphaNum(a.name, b.name)

export default class Album {
  // implements a directory tree
  // contains a number of recursive functions
  p: string // path ./public/content/albums/...
  is_leaf: boolean
  subalbums?: Album[] // from filesystem
  photos?: string[] // from filesystem, just the filenames
  album_config?: AlbumConfig // read from config file
  // to be computed recursively after reading config
  cover: string = ""
  count: number = 0
  breadcrumb: string[] = []

  constructor(p: string) {
    /*
    recursively crawls through directory tree
    stores subalbums or filenames of images
    */
    this.p = p
    const contents = fs.readdirSync(p, {withFileTypes: true}).sort(sortFiles)
    this.is_leaf = isLeaf(contents)
    if (this.is_leaf) {
      const images = contents.filter(isImage)
      this.photos = images.map(i => i.name)
    } else {
      const dirs = contents.filter(c => c.isDirectory())
      this.subalbums = dirs.map(d => new Album(d.parentPath + path.sep + d.name))
    }
  }

  findAlbum(s: string) {
    // given subalbum directory name, return element of this.subalbums
    return this.subalbums?.find(t => {
      const t_path = t.p.split("/")
      return t_path[t_path.length-1] == s
    })
  }

  subalbumsFromConfig() {
    // return Album[] in the order specified by config
    return this.album_config?.subalbums?.map(s => this.findAlbum(s)).filter(s => s instanceof Album) || []
  }

  process() {
    // recursive
    if (this.is_leaf) {

    } else {
      for (let s of this.subalbums || []) {
        s.process()
      }
    }
    this.newConfig()
  }

  newConfig() {
    if (fs.existsSync(this.p + "/config.json")) {
      if (this.contentChanged()) {
        this.writeConfig("config-new.json")
        console.log("Contents of " + pathToURL(this.p, 3) + " have changed. New configuration file saved as config-new.json.")
      }
    } else {
      this.writeConfig("config.json")
      console.log("New configuration file for " + pathToURL(this.p, 3) + " saved as config.json.")
    }
  }

  contentChanged() {
    // TODO: maybe use checksum?
    return true
  }

  writeConfig(filename: string) {
    let album_config: AlbumConfig
    if (this.is_leaf) {
      album_config = {
        title: this.p == config.albums_path ? "All Photos" : path.basename(this.p),
        cover: "",
        photos: this.photos ? this.photos.map(p => ({filename: p, desc: ""})) : []
      }
    } else {
      album_config = {
        title: this.p == config.albums_path ? "All Albums" : path.basename(this.p),
        cover: "",
        subalbums: this.subalbums ? this.subalbums.map(s => path.basename(s.p)) : []
      }
    }
    const data = JSON.stringify(album_config, null, 2)
    fs.writeFileSync(this.p + "/" + filename, data)
    // don't store into this.album_config, which is populated by this.loadConfig()
  }

  loadConfig() {
    // recursive
    // TODO: validate config
    if (this.is_leaf) {

    } else {
      for (let s of this.subalbums || []) {
        s.loadConfig()
      }
    }
    this.album_config = JSON.parse(fs.readFileSync(this.p + "/config.json", "utf8"))
  }

  setBreadcrumb() {
    // recursive
    if (this.is_leaf) {

    } else {
      for (let s of this.subalbumsFromConfig()) {
        s.breadcrumb = this.breadcrumb.concat([this.album_config?.title || ""])
        s.setBreadcrumb()
      }
    }
  }

  setCover() {
    // recursive
    if (this.is_leaf) {
      if (this.album_config?.photos) {
        // default to (manually ordered) first photo, use absolute path
        this.cover = pathToURL(this.p, 2) + "/" + (this.album_config.cover || this.album_config.photos[0].filename)
      }
    } else {
      if (this.album_config?.subalbums) {
        let child_cover = ""
        // default to cover of (manually ordered) first child
        for (let s of this.subalbums || []) {
          s.setCover()
          let s_path = s.p.split("/")
          if (s_path[s_path.length-1] == this.album_config.subalbums[0]) {
            child_cover = s.cover
          }
        }
        this.cover = this.album_config.cover || child_cover
      }
    }
  }

  setCount() {
    // recursive
    if (this.is_leaf) {
      if (this.album_config?.photos) {
        this.count = this.album_config.photos.length
      }
    } else {
      if (this.album_config?.subalbums) {
        let count = 0
        for (let s of this.subalbums || []) {
          s.setCount()
          count += s.count
        }
        this.count = count
      }
    }
  }

  getData() {
    let album_data : AlbumData = {
      is_leaf: this.is_leaf,
      url: pathToURL(this.p, 3),
      title: this.album_config?.title || "",
      breadcrumb: this.breadcrumb,
    }
    if (this.is_leaf) {
      album_data.photos = this.album_config?.photos?.map(p => ({
        src: pathToURL(this.p, 2) + "/" + p.filename,
        desc: p.desc
      })) || []
    } else {
      // get Album[] from string[] of directory names
      album_data.subalbums = this.subalbumsFromConfig().map(s => ({
        url: pathToURL(s?.p || "", 3),
        title: s?.album_config?.title || "",
        cover: s?.cover || "",
        count: s?.count || 0
      })) || []
    }
    return album_data
  }

  compileData() {
    // recursive
    let albums = [this.getData()]
    if (this.is_leaf) {

    } else {
      for (let s of this.subalbums || []) {
        albums = albums.concat(s.compileData())
      }
    }
    return albums
  }

  async processPhotos() {
    // recursive
    if (this.is_leaf) {
      // TODO: detect changes to contents
      fs.mkdirSync('./public/img/' + pathToURL(this.p, 4), {recursive: true})
      for (let p of this.photos || []) {
        await processImage(pathToURL(this.p, 2) + "/" + p)
      }
    } else {
      for (let s of this.subalbums || []) {
        await s.processPhotos()
      }
    }
  }
}

export function removeOrphans(p: string) {
  // recursive
  // make sure thumbnails / directories have counterparts in /content/albums/
  const contents = fs.readdirSync(p, {withFileTypes: true})
  const is_leaf = isLeaf(contents)
  if (is_leaf) {
    contents.filter(isImage).map(c => {
      const master_file_sans_ext = config.albums_path + pathToURL(c.parentPath, 3) + "/" + c.name.substring(0, c.name.lastIndexOf("-"))
      let master_exists = false
      for (let ext of ['.jpg', '.JPG', '.png', '.PNG', '.webp', '.WEBP']) {
        if (fs.existsSync(master_file_sans_ext + ext)) {
          master_exists = true
          break
        }
      }
      if (!master_exists) {
        fs.rmSync(c.parentPath + "/" + c.name)
        console.log('Deleted orphaned thumbnail ' + c.parentPath + "/" + c.name)
      }
    })
  } else {
    contents.filter(c => c.isDirectory()).map(c => removeOrphans(c.parentPath + "/" + c.name))
  }
  const new_contents = fs.readdirSync(p, {withFileTypes: true})
  if ((new_contents.filter(c => c.isDirectory()).length + new_contents.filter(isImage).length) == 0) {
    fs.rmSync(p, {recursive: true})
    console.log('Deleted orphaned directory ' + p)
  }
}