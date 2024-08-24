import fs from "fs"
import path from "path"
import sharp from "sharp"
import config from "../site-config.json"

// one entry of /data/albums.json
export type AlbumData = {
  is_leaf: boolean
  url: string // absolute album url
  title: {[locale: string]: string}
  breadcrumb: {[locale: string]: string}[] // titles of parents
  // cover: string // absolute photo src from /content/albums/
  subalbums?: {
    url: string // absolute album url
    title: {[locale: string]: string}
    cover: string // absolute photo src from /content/albums/
    photo_count: number
    album_count: number
  }[]
  photos?: {
    src: string // absolute photo src from /content/albums/
    desc: {[locale: string]: string}
    // hidden?: boolean
  }[]
}

// content of config.json in each subdirectory
type AlbumConfig = {
  title: {[locale: string]: string}
  cover: string // relative path to cover photo or ""
  photos?: {
    filename: string,
    desc: {[locale: string]: string}
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
  return (d.isFile() || d.isSymbolicLink()) && [".jpg", ".png", ".webp"].includes(path.extname(d.name).toLowerCase())
}

async function generateThumbnail(src: string, s: number, fit: keyof sharp.FitEnum, new_path: string) {
  await sharp("." + src).resize(s, s, {fit: fit}).webp().toFile(new_path)
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

function translate(t: (i: number) => string) {
  // t returns the translated string corresponding to the i-th locale
  return config.locales.map((l, i) => [l, t(i)]).reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {} as {[locale: string]: string})
}

function defaultLanguageIfEmpty(dict: {[locale: string]: string}) {
  return translate(i =>
    i == 0 ? dict[config.locales[0]] : (
      dict[config.locales[i]] == "" ? dict[config.locales[0]] : dict[config.locales[i]]
    )
  )
}

export default class Album {
  // implements a directory tree
  // contains a number of recursive functions
  p: string // path ./content/albums/...
  is_leaf: boolean
  subalbums?: Album[] // from filesystem
  photos?: string[] // from filesystem, just the filenames
  album_config?: AlbumConfig // read from config file
  // to be computed recursively after reading config
  cover: string = ""
  photo_count: number = 0
  album_count: number = 0
  breadcrumb: {[locale: string]: string}[] = []

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
        console.log("Contents of " + pathToURL(this.p, 2) + " have changed. New configuration file saved as config-new.json.")
      }
    } else {
      this.writeConfig("config.json")
      console.log("New configuration file for " + pathToURL(this.p, 2) + " saved as config.json.")
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
        title: translate(i =>
          this.p == config.albums_path ? config.t_all_photos[i] : (
            // default to directory name for default locale, empty string otherwise
            i == 0 ? path.basename(this.p) : ""
          )
        ),
        cover: "",
        photos: this.photos ? this.photos.map(p => (
          {filename: p, desc: translate(i => "")}
        )) : []
      }
    } else {
      album_config = {
        title: translate(i =>
          this.p == config.albums_path ? config.t_all_albums[i] : (
            // default to directory name for default locale, empty string otherwise
            i == 0 ? path.basename(this.p) : ""
          )
        ),
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

  setTitle() {
    // recursive
    // use default language title if empty
    if (this.album_config) {
      this.album_config.title = defaultLanguageIfEmpty(this.album_config.title)
    }
    if (this.is_leaf) {

    } else {
      for (let s of this.subalbums || []) {
        s.setTitle()
      }
    }
  }

  setBreadcrumb() {
    // recursive
    // run after this.setTitle
    if (this.is_leaf) {

    } else {
      for (let s of this.subalbumsFromConfig()) {
        s.breadcrumb = this.breadcrumb.concat([
          translate(i => this.album_config?.title[config.locales[i]] || "")
        ])
        s.setBreadcrumb()
      }
    }
  }

  setCover() {
    // recursive
    if (this.is_leaf) {
      if (this.album_config?.photos) {
        // default to (manually ordered) first photo, use absolute path
        this.cover = pathToURL(this.p, 3) + "/" + (this.album_config.cover || this.album_config.photos[0].filename)
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
        this.cover = this.album_config.cover ? pathToURL(this.p, 3) + "/" + this.album_config.cover : child_cover
      }
    }
  }

  setCount() {
    // recursive
    if (this.is_leaf) {
      if (this.album_config?.photos) {
        this.photo_count = this.album_config.photos.length
      }
    } else {
      if (this.album_config?.subalbums) {
        let photo_count = 0
        for (let s of this.subalbums || []) {
          s.setCount()
          photo_count += s.photo_count
        }
        this.photo_count = photo_count
        this.album_count = this.subalbums?.length || 0
      }
    }
  }

  getData() {
    let album_data : AlbumData = {
      is_leaf: this.is_leaf,
      url: pathToURL(this.p, 2),
      title: this.album_config?.title || {},
      breadcrumb: this.breadcrumb,
    }
    if (this.is_leaf) {
      album_data.photos = this.album_config?.photos?.map(p => ({
        src: pathToURL(this.p, 3) + "/" + p.filename,
        desc: p.desc
      })) || []
    } else {
      // get Album[] from string[] of directory names
      album_data.subalbums = this.subalbumsFromConfig().map(s => ({
        url: pathToURL(s?.p || "", 2),
        title: s?.album_config?.title || {},
        cover: s?.cover || "",
        photo_count: s?.photo_count || 0,
        album_count: s?.album_count || 0
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
      fs.mkdirSync('./public/img/' + pathToURL(this.p, 3), {recursive: true})
      for (let p of this.photos || []) {
        await processImage(pathToURL(this.p, 1) + "/" + p)
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