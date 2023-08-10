import path from "path"

export function imageSize(src: string, size: number) {
  let s : number
  let new_path : string
  if (size <= 320) {
    s = 320
    new_path = "/img" + src.substring(15)
    let ext = path.extname(new_path)
    new_path = new_path.substring(0, new_path.length - ext.length) + '-' + s + '.webp'
  } else {
    new_path = src
  }
  new_path = encodeURI(new_path)
  return new_path
}