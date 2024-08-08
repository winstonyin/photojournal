"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = compilePosts;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var site_config_json_1 = __importDefault(require("../site-config.json"));
function pathToURL(p, trim) {
    // TODO: consolidate this with the one in album-data.ts
    // assumes ./public/content/albums/[more_path]
    // returns /albums/[more_path] for trim=3
    return "/" + p.split(path_1.default.sep).slice(trim).join("/");
}
var Post = /** @class */ (function () {
    function Post(p) {
        this.cover = "";
        this.count = 0;
        this.blurb = "";
        this.galleries = []; // array of galleries, each an array of photos
        var filename = pathToURL(p, 4);
        this.slug = filename.substring(1, filename.length - 3);
        this.contents = fs_1.default.readFileSync(p).toString();
        var title_match = this.contents.match(/title:\s*(.+)/);
        this.title = title_match ? title_match[1] : "";
        var date_match = this.contents.match(/date:\s*(\d\d\d\d)\-(\d\d)\-(\d\d)/);
        this.date = date_match ? date_match[1] + date_match[2] + date_match[3] : "";
        this.dirs = this.contents.match(/directory:\s*\[.+\]\(.+\)/g) || [];
    }
    Post.prototype.expandDirs = function () {
        var _this = this;
        var replace_regex = new RegExp("<gallery>.+?<\/gallery>", "gs");
        this.contents = this.contents.replace(replace_regex, function (m) {
            for (var _i = 0, _a = _this.dirs; _i < _a.length; _i++) {
                var d = _a[_i];
                var match_dict = d.match(/\[(.+)\]\((.+)\)/) || [];
                var regex = new RegExp("^(\\*|)" + match_dict[1].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gm"); // auto escape characters
                var replace = "$1" + match_dict[2].replace(/\$/g, "$$$$"); // escape dollar signs
                m = m.replace(regex, replace).replace(/\n+/g, '\n'); // remove extraneous lines
            }
            return m;
        });
    };
    Post.prototype.setCount = function () {
        var _this = this;
        // run after this.expandDirs
        this.count = 0;
        var replace_regex = new RegExp("<gallery>.+?<\/gallery>", "gs");
        // TODO: change replace to match
        this.contents.replace(replace_regex, function (m) {
            var matches = m.match(/^(\*\/|\/)/gm);
            _this.count += matches ? matches.length : 0;
            return m;
        });
    };
    Post.prototype.setCover = function () {
        // run after this.expandDirs
        var featured_regex = new RegExp("<gallery>.*?\n\\*(.+?)\n.*?<\/gallery>", "s");
        var featured_match = this.contents.match(featured_regex);
        if (featured_match) {
            this.cover = pathToURL(site_config_json_1.default.albums_path, 2) + featured_match[1];
        }
        else {
            // if not set using "*", default to first photo
            var first_regex = new RegExp("<gallery>\n+(.+?)\n", "s");
            var first_match = this.contents.match(first_regex);
            this.cover = first_match ? pathToURL(site_config_json_1.default.albums_path, 2) + first_match[1] : "";
        }
    };
    Post.prototype.setGalleries = function () {
        var _this = this;
        var albums = JSON.parse(fs_1.default.readFileSync("./data/albums.json", "utf8"));
        var gallery_regex = new RegExp("<gallery>(.+?)<\/gallery>", "gs");
        this.galleries = [];
        // TODO: change replace to match
        this.contents.replace(gallery_regex, function (_, p1) {
            var gallery = [];
            // TODO: change replace to match
            p1.replace(/^(\*|)(\/.+)/gm, function (_0, _1, p2) {
                var _a;
                var src = pathToURL(site_config_json_1.default.albums_path, 2) + p2;
                var a = albums.find(function (a) { return a.url == pathToURL(site_config_json_1.default.albums_path, 3) + path_1.default.dirname(p2); });
                var photo = ((_a = a === null || a === void 0 ? void 0 : a.photos) === null || _a === void 0 ? void 0 : _a.find(function (p) { return p.src == src; })) || { src: "", desc: "" };
                gallery.push({ src: src, desc: photo.desc || "" });
                return "";
            });
            _this.galleries.push(gallery);
            return "";
        });
    };
    Post.prototype.cleanup = function () {
        // run after set...
        var empty_lines_regex = new RegExp("\n\n+", "gs");
        var leading_newline_regex = new RegExp("^\n+", "s");
        var gallery_regex = new RegExp("<gallery>.+?<\/gallery>", "gs");
        var id = 0;
        this.contents = this.contents.replace(/title:\s*.+/, "")
            .replace(/date:\s*\d\d\d\d\-\d\d\-\d\d/, "")
            .replace(/directory:\s*\[.+\]\(.+\)/g, "")
            .replace(empty_lines_regex, "\n\n") // empty lines
            .replace(leading_newline_regex, "") // leading newline
            .replace(gallery_regex, function (_) {
            var ret = "<gallery id=\"" + id + "\"/>";
            id += 1;
            return ret;
        });
    };
    Post.prototype.setBlurb = function () {
        // run after this.cleanup
        this.blurb = this.contents.replace(/^<gallery.+?\/>/gm, "")
            .replace(/^\n/gm, "")
            .substring(0, 200); // first 200 characters
    };
    Post.prototype.getData = function () {
        return {
            slug: this.slug,
            title: this.title,
            date: this.date,
            cover: this.cover,
            count: this.count,
            blurb: this.blurb,
            post: this.contents,
            galleries: this.galleries
        };
    };
    return Post;
}());
function isPost(dirent) {
    return dirent.isFile() && path_1.default.extname(dirent.name).toLowerCase() == '.md';
}
function processPost(dirent) {
    var post = new Post(dirent.parentPath + path_1.default.sep + dirent.name);
    post.expandDirs();
    post.setCount();
    post.setCover();
    post.setGalleries();
    post.cleanup();
    post.setBlurb();
    return post.getData();
}
function compilePosts(p) {
    return fs_1.default.readdirSync(p, { withFileTypes: true }).filter(isPost).map(processPost).sort(function (a, b) { return +b.date - +a.date; });
}
