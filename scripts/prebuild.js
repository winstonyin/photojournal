"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
This script is run as a prebuild hook to the standard build process.
It takes all the user generated and customised content in /public/content/
and compiles json files in /data/ containing useful data for the build
process.
*/
var fs_1 = __importDefault(require("fs"));
var album_data_1 = __importDefault(require("./album-data"));
var post_data_1 = __importDefault(require("./post-data"));
var site_config_json_1 = __importDefault(require("../site-config.json"));
// TODO: implement commands for generating config, thumbnails, album data
var a = new album_data_1.default(site_config_json_1.default.albums_path);
a.loadConfig();
a.setTitle();
a.setBreadcrumb();
a.setCover();
a.setCount();
var album_data = JSON.stringify(a.compileData(), null, 2);
fs_1.default.writeFileSync("./data/albums.json", album_data);
var posts = (0, post_data_1.default)(site_config_json_1.default.posts_path);
var posts_data = JSON.stringify(posts, null, 2);
fs_1.default.writeFileSync("./data/posts.json", posts_data);
