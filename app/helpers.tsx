import path from "path"

export function imageSize(src: string, size: number) {
  let s : number
  let new_path : string
  if (size*2 <= 320) {
    s = 320
    new_path = "/img" + src.substring(15)
    let ext = path.extname(new_path)
    new_path = new_path.substring(0, new_path.length - ext.length) + '-' + s + '.webp'
  } else if (size*2 <= 640) {
    s = 640
    new_path = "/img" + src.substring(15)
    let ext = path.extname(new_path)
    new_path = new_path.substring(0, new_path.length - ext.length) + '-' + s + '.webp'
  } else if (size*2 <= 1200) {
    s = 1200
    new_path = "/img" + src.substring(15)
    let ext = path.extname(new_path)
    new_path = new_path.substring(0, new_path.length - ext.length) + '-' + s + '.webp'
  } else if (size*2 <= 2048) {
    s = 2048
    new_path = "/img" + src.substring(15)
    let ext = path.extname(new_path)
    new_path = new_path.substring(0, new_path.length - ext.length) + '-' + s + '.webp'
  } else { // for now default to largest webp
    // new_path = src
    s = 2048
    new_path = "/img" + src.substring(15)
    let ext = path.extname(new_path)
    new_path = new_path.substring(0, new_path.length - ext.length) + '-' + s + '.webp'
  }
  new_path = encodeURI(new_path)
  return new_path
}