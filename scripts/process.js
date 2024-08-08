"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
This script should be run whenever content is changed
*/
var album_data_1 = __importDefault(require("./album-data"));
var site_config_json_1 = __importDefault(require("../site-config.json"));
var a = new album_data_1.default(site_config_json_1.default.albums_path);
a.process();
