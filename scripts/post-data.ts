import fs from "fs"
import path from "path"
import config from "../site-config.json"
import albums from "../data/albums.json"

function pathToURL(p: string, trim: number) {
  // TODO: consolidate this with the one in album-data.ts
  // assumes ./public/content/albums/[more_path]
  // returns /albums/[more_path] for trim=3
  return "/" + p.split(path.sep).slice(trim).join("/")
}

class Post {
  slug: string // path ./public/content/albums/...
  contents: string
  title: string
  date: string
  dirs: string[]
  cover: string = ""
  count: number = 0
  blurb: string = ""
  galleries: {src: string, desc: string}[][] = [] // array of galleries, each an array of photos

  constructor(p: string) {
    const filename = pathToURL(p, 4)
    this.slug = filename.substring(1, filename.length - 3)
    this.contents = fs.readFileSync(p).toString()
    const title_match = this.contents.match(/title:\s*(.+)/)
    this.title = title_match ? title_match[1] : ""
    const date_match = this.contents.match(/date:\s*(\d\d\d\d)\-(\d\d)\-(\d\d)/)
    this.date = date_match ? date_match[1] + date_match[2] + date_match[3] : ""
    this.dirs = this.contents.match(/directory:\s*\[.+\]\(.+\)/g) || []
  }

  expandDirs() {
    const replace_regex = new RegExp("<gallery>.+?<\/gallery>", "gs")
    this.contents = this.contents.replace(replace_regex, m => {
      for (let d of this.dirs) {
        const match_dict = d.match(/\[(.+)\]\((.+)\)/) || []
        const regex = new RegExp("^(\\*|)" + match_dict[1].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gm") // auto escape characters
        const replace = "$1" + match_dict[2].replace(/\$/g, "$$$$") // escape dollar signs
        m = m.replace(regex, replace).replace(/\n+/g, '\n') // remove extraneous lines
      }
      return m
    })
  }

  setCount() {
    // run after this.expandDirs
    this.count = 0
    const replace_regex = new RegExp("<gallery>.+?<\/gallery>", "gs")
    // TODO: change replace to match
    this.contents.replace(replace_regex, m => {
      const matches = m.match(/^(\*\/|\/)/gm)
      this.count += matches ? matches.length : 0
      return m
    })
  }

  setCover() {
    // run after this.expandDirs
    const featured_regex = new RegExp("<gallery>.*?\n\\*(.+?)\n.*?<\/gallery>", "s")
    const featured_match = this.contents.match(featured_regex)
    if (featured_match) {
      this.cover = pathToURL(config.albums_path, 2) + featured_match[1]
    } else {
      // if not set using "*", default to first photo
      const first_regex = new RegExp("<gallery>\n+(.+?)\n", "s")
      const first_match = this.contents.match(first_regex)
      this.cover = first_match ? pathToURL(config.albums_path, 2) + first_match[1] : ""
    }
  }

  setGalleries() {
    const gallery_regex = new RegExp("<gallery>(.+?)<\/gallery>", "gs")
    this.galleries = []
    // TODO: change replace to match
    this.contents.replace(gallery_regex, (_, p1: string) => {
      let gallery : {src: string, desc: string}[] = []
      // TODO: change replace to match
      p1.replace(/^(\*|)(\/.+)/gm, (_0, _1, p2) => {
        const src = pathToURL(config.albums_path, 2) + p2
        const a = albums.find(a => a.url == pathToURL(config.albums_path, 3) + path.dirname(p2))
        const photo = a?.photos?.find((p: {src: string, desc: string}) => p.src == src)
        gallery.push({src: src, desc: photo?.desc || ""})
        return ""
      })
      this.galleries.push(gallery)
      return ""
    })
  }

  cleanup() {
    // run after set...
    const empty_lines_regex = new RegExp("\n\n+", "gs")
    const leading_newline_regex = new RegExp("^\n+", "s")
    const gallery_regex = new RegExp("<gallery>.+?<\/gallery>", "gs")
    let id = 0
    this.contents = this.contents.replace(/title:\s*.+/, "")
      .replace(/date:\s*\d\d\d\d\-\d\d\-\d\d/, "")
      .replace(/directory:\s*\[.+\]\(.+\)/g, "")
      .replace(empty_lines_regex, "\n\n") // empty lines
      .replace(leading_newline_regex, "") // leading newline
      .replace(gallery_regex, _ => {
        const ret = "<gallery id=\"" + id + "\"/>"
        id += 1
        return ret
      })
  }

  setBlurb() {
    // run after this.cleanup
    this.blurb = this.contents.replace(/^<gallery.+?\/>/gm, "")
      .replace(/^\n/gm, "")
      .substring(0, 200) // first 200 characters
  }

  getData() {
    return {
      slug: this.slug,
      title: this.title,
      date: this.date,
      cover: this.cover,
      count: this.count,
      blurb: this.blurb,
      post: this.contents,
      galleries: this.galleries
    }
  }
}

function isPost(dirent: fs.Dirent) {
  return dirent.isFile() && path.extname(dirent.name).toLowerCase() == '.md'
}

function processPost(dirent: fs.Dirent) {
  const post = new Post(dirent.parentPath + path.sep + dirent.name)
  post.expandDirs()
  post.setCount()
  post.setCover()
  post.setGalleries()
  post.cleanup()
  post.setBlurb()
  return post.getData()
}

export default function compilePosts(p: string) {
  return fs.readdirSync(p, {withFileTypes: true}).filter(isPost).map(processPost).sort((a, b) => +b.date - +a.date)
}
