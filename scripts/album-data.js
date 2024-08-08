"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOrphans = removeOrphans;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var site_config_json_1 = __importDefault(require("../site-config.json"));
function isLeaf(contents) {
    // false if contents contain directories
    for (var _i = 0, contents_1 = contents; _i < contents_1.length; _i++) {
        var c = contents_1[_i];
        if (c.isDirectory()) {
            return false;
        }
    }
    return true;
}
function pathToURL(p, trim) {
    // assumes ./public/content/albums/[more_path]
    // returns /albums/[more_path] for trim=3
    return "/" + p.split(path_1.default.sep).slice(trim).join("/");
}
function isImage(d) {
    return d.isFile() && [".jpg", ".png", ".webp"].includes(path_1.default.extname(d.name).toLowerCase());
}
function generateThumbnail(src, s, fit, new_path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, sharp_1.default)('./public' + src).resize(s, s, { fit: fit }).webp().toFile(new_path)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, { src: src, s: s }];
            }
        });
    });
}
function processImage(src) {
    return __awaiter(this, void 0, void 0, function () {
        var base_path, ext, _i, _a, s, new_path, _b, _c, s, new_path;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    base_path = "./public/img" + pathToURL(src, 3);
                    ext = path_1.default.extname(base_path);
                    _i = 0, _a = site_config_json_1.default.thumb_sizes;
                    _d.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    s = _a[_i];
                    new_path = base_path.substring(0, base_path.length - ext.length) + "-" + s + ".webp";
                    if (!!fs_1.default.existsSync(new_path)) return [3 /*break*/, 3];
                    return [4 /*yield*/, generateThumbnail(src, s, "cover", new_path)
                            .then(function (r) { return console.log("Generated size " + r.s + "px for " + r.src); })];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    _b = 0, _c = site_config_json_1.default.full_sizes;
                    _d.label = 5;
                case 5:
                    if (!(_b < _c.length)) return [3 /*break*/, 8];
                    s = _c[_b];
                    new_path = base_path.substring(0, base_path.length - ext.length) + "-" + s + ".webp";
                    if (!!fs_1.default.existsSync(new_path)) return [3 /*break*/, 7];
                    return [4 /*yield*/, generateThumbnail(src, s, "inside", new_path)
                            .then(function (r) { return console.log("Generated size " + r.s + "px for " + r.src); })];
                case 6:
                    _d.sent();
                    _d.label = 7;
                case 7:
                    _b++;
                    return [3 /*break*/, 5];
                case 8: return [2 /*return*/];
            }
        });
    });
}
var sortAlphaNum = function (a, b) { return a.localeCompare(b, "en", { numeric: true }); };
var sortFiles = function (a, b) { return sortAlphaNum(a.name, b.name); };
var Album = /** @class */ (function () {
    function Album(p) {
        // to be computed recursively after reading config
        this.cover = "";
        this.count = 0;
        this.breadcrumb = [];
        /*
        recursively crawls through directory tree
        stores subalbums or filenames of images
        */
        this.p = p;
        var contents = fs_1.default.readdirSync(p, { withFileTypes: true }).sort(sortFiles);
        this.is_leaf = isLeaf(contents);
        if (this.is_leaf) {
            var images = contents.filter(isImage);
            this.photos = images.map(function (i) { return i.name; });
        }
        else {
            var dirs = contents.filter(function (c) { return c.isDirectory(); });
            this.subalbums = dirs.map(function (d) { return new Album(d.parentPath + path_1.default.sep + d.name); });
        }
    }
    Album.prototype.findAlbum = function (s) {
        var _a;
        // given subalbum directory name, return element of this.subalbums
        return (_a = this.subalbums) === null || _a === void 0 ? void 0 : _a.find(function (t) {
            var t_path = t.p.split("/");
            return t_path[t_path.length - 1] == s;
        });
    };
    Album.prototype.subalbumsFromConfig = function () {
        var _this = this;
        var _a, _b;
        // return Album[] in the order specified by config
        return ((_b = (_a = this.album_config) === null || _a === void 0 ? void 0 : _a.subalbums) === null || _b === void 0 ? void 0 : _b.map(function (s) { return _this.findAlbum(s); }).filter(function (s) { return s instanceof Album; })) || [];
    };
    Album.prototype.process = function () {
        // recursive
        if (this.is_leaf) {
        }
        else {
            for (var _i = 0, _a = this.subalbums || []; _i < _a.length; _i++) {
                var s = _a[_i];
                s.process();
            }
        }
        this.newConfig();
    };
    Album.prototype.newConfig = function () {
        if (fs_1.default.existsSync(this.p + "/config.json")) {
            if (this.contentChanged()) {
                this.writeConfig("config-new.json");
                console.log("Contents of " + pathToURL(this.p, 3) + " have changed. New configuration file saved as config-new.json.");
            }
        }
        else {
            this.writeConfig("config.json");
            console.log("New configuration file for " + pathToURL(this.p, 3) + " saved as config.json.");
        }
    };
    Album.prototype.contentChanged = function () {
        // TODO: maybe use checksum?
        return true;
    };
    Album.prototype.writeConfig = function (filename) {
        var album_config;
        if (this.is_leaf) {
            album_config = {
                title: this.p == site_config_json_1.default.albums_path ? "All Photos" : path_1.default.basename(this.p),
                cover: "",
                photos: this.photos ? this.photos.map(function (p) { return ({ filename: p, desc: "" }); }) : []
            };
        }
        else {
            album_config = {
                title: this.p == site_config_json_1.default.albums_path ? "All Albums" : path_1.default.basename(this.p),
                cover: "",
                subalbums: this.subalbums ? this.subalbums.map(function (s) { return path_1.default.basename(s.p); }) : []
            };
        }
        var data = JSON.stringify(album_config, null, 2);
        fs_1.default.writeFileSync(this.p + "/" + filename, data);
        // don't store into this.album_config, which is populated by this.loadConfig()
    };
    Album.prototype.loadConfig = function () {
        // recursive
        // TODO: validate config
        if (this.is_leaf) {
        }
        else {
            for (var _i = 0, _a = this.subalbums || []; _i < _a.length; _i++) {
                var s = _a[_i];
                s.loadConfig();
            }
        }
        this.album_config = JSON.parse(fs_1.default.readFileSync(this.p + "/config.json", "utf8"));
    };
    Album.prototype.setBreadcrumb = function () {
        var _a;
        // recursive
        if (this.is_leaf) {
        }
        else {
            for (var _i = 0, _b = this.subalbumsFromConfig(); _i < _b.length; _i++) {
                var s = _b[_i];
                s.breadcrumb = this.breadcrumb.concat([((_a = this.album_config) === null || _a === void 0 ? void 0 : _a.title) || ""]);
                s.setBreadcrumb();
            }
        }
    };
    Album.prototype.setCover = function () {
        var _a, _b;
        // recursive
        if (this.is_leaf) {
            if ((_a = this.album_config) === null || _a === void 0 ? void 0 : _a.photos) {
                // default to (manually ordered) first photo, use absolute path
                this.cover = pathToURL(this.p, 2) + "/" + (this.album_config.cover || this.album_config.photos[0].filename);
            }
        }
        else {
            if ((_b = this.album_config) === null || _b === void 0 ? void 0 : _b.subalbums) {
                var child_cover = "";
                // default to cover of (manually ordered) first child
                for (var _i = 0, _c = this.subalbums || []; _i < _c.length; _i++) {
                    var s = _c[_i];
                    s.setCover();
                    var s_path = s.p.split("/");
                    if (s_path[s_path.length - 1] == this.album_config.subalbums[0]) {
                        child_cover = s.cover;
                    }
                }
                this.cover = this.album_config.cover || child_cover;
            }
        }
    };
    Album.prototype.setCount = function () {
        var _a, _b;
        // recursive
        if (this.is_leaf) {
            if ((_a = this.album_config) === null || _a === void 0 ? void 0 : _a.photos) {
                this.count = this.album_config.photos.length;
            }
        }
        else {
            if ((_b = this.album_config) === null || _b === void 0 ? void 0 : _b.subalbums) {
                var count = 0;
                for (var _i = 0, _c = this.subalbums || []; _i < _c.length; _i++) {
                    var s = _c[_i];
                    s.setCount();
                    count += s.count;
                }
                this.count = count;
            }
        }
    };
    Album.prototype.getData = function () {
        var _this = this;
        var _a, _b, _c;
        var album_data = {
            is_leaf: this.is_leaf,
            url: pathToURL(this.p, 3),
            title: ((_a = this.album_config) === null || _a === void 0 ? void 0 : _a.title) || "",
            breadcrumb: this.breadcrumb,
        };
        if (this.is_leaf) {
            album_data.photos = ((_c = (_b = this.album_config) === null || _b === void 0 ? void 0 : _b.photos) === null || _c === void 0 ? void 0 : _c.map(function (p) { return ({
                src: pathToURL(_this.p, 2) + "/" + p.filename,
                desc: p.desc
            }); })) || [];
        }
        else {
            // get Album[] from string[] of directory names
            album_data.subalbums = this.subalbumsFromConfig().map(function (s) {
                var _a;
                return ({
                    url: pathToURL((s === null || s === void 0 ? void 0 : s.p) || "", 3),
                    title: ((_a = s === null || s === void 0 ? void 0 : s.album_config) === null || _a === void 0 ? void 0 : _a.title) || "",
                    cover: (s === null || s === void 0 ? void 0 : s.cover) || "",
                    count: (s === null || s === void 0 ? void 0 : s.count) || 0
                });
            }) || [];
        }
        return album_data;
    };
    Album.prototype.compileData = function () {
        // recursive
        var albums = [this.getData()];
        if (this.is_leaf) {
        }
        else {
            for (var _i = 0, _a = this.subalbums || []; _i < _a.length; _i++) {
                var s = _a[_i];
                albums = albums.concat(s.compileData());
            }
        }
        return albums;
    };
    Album.prototype.processPhotos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, p, _b, _c, s;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.is_leaf) return [3 /*break*/, 5];
                        // TODO: detect changes to contents
                        fs_1.default.mkdirSync('./public/img/' + pathToURL(this.p, 4), { recursive: true });
                        _i = 0, _a = this.photos || [];
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        p = _a[_i];
                        return [4 /*yield*/, processImage(pathToURL(this.p, 2) + "/" + p)];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        _b = 0, _c = this.subalbums || [];
                        _d.label = 6;
                    case 6:
                        if (!(_b < _c.length)) return [3 /*break*/, 9];
                        s = _c[_b];
                        return [4 /*yield*/, s.processPhotos()];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8:
                        _b++;
                        return [3 /*break*/, 6];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return Album;
}());
exports.default = Album;
function removeOrphans(p) {
    // recursive
    // make sure thumbnails / directories have counterparts in /content/albums/
    var contents = fs_1.default.readdirSync(p, { withFileTypes: true });
    var is_leaf = isLeaf(contents);
    if (is_leaf) {
        contents.filter(isImage).map(function (c) {
            var master_file_sans_ext = site_config_json_1.default.albums_path + pathToURL(c.parentPath, 3) + "/" + c.name.substring(0, c.name.lastIndexOf("-"));
            var master_exists = false;
            for (var _i = 0, _a = ['.jpg', '.JPG', '.png', '.PNG', '.webp', '.WEBP']; _i < _a.length; _i++) {
                var ext = _a[_i];
                if (fs_1.default.existsSync(master_file_sans_ext + ext)) {
                    master_exists = true;
                    break;
                }
            }
            if (!master_exists) {
                fs_1.default.rmSync(c.parentPath + "/" + c.name);
                console.log('Deleted orphaned thumbnail ' + c.parentPath + "/" + c.name);
            }
        });
    }
    else {
        contents.filter(function (c) { return c.isDirectory(); }).map(function (c) { return removeOrphans(c.parentPath + "/" + c.name); });
    }
    var new_contents = fs_1.default.readdirSync(p, { withFileTypes: true });
    if ((new_contents.filter(function (c) { return c.isDirectory(); }).length + new_contents.filter(isImage).length) == 0) {
        fs_1.default.rmSync(p, { recursive: true });
        console.log('Deleted orphaned directory ' + p);
    }
}
