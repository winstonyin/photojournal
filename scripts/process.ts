/*
This script should be run whenever content is changed
*/
import Album from "./album-data"
import { removeOrphans } from "./album-data"
import config from "../site-config.json"

const a = new Album(config.albums_path)
a.processPhotos().then(() => removeOrphans("./public/img")) // TODO: put into site-config.json
a.process()