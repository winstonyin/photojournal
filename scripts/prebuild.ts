/*
This script is run as a prebuild hook to the standard build process.
It takes all the user generated and customised content in /public/content/
and compiles json files in /data/ containing useful data for the build
process.
*/
import fs from "fs"
import Album from "./album-data"
import processPosts from "./post-data"
import config from "../site-config.json"

// TODO: implement commands for generating config, thumbnails, album data
const a = new Album(config.albums_path)
a.loadConfig()
a.setTitle()
a.setBreadcrumb()
a.setCover()
a.setCount()
const album_data = JSON.stringify(a.compileData(), null, 2)
fs.writeFileSync("./data/albums.json", album_data)

const posts = processPosts(config.posts_path)
const posts_data = JSON.stringify(posts, null, 2)
fs.writeFileSync("./data/posts.json", posts_data)