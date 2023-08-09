'use client'

export default function imageLoader({src, width, quality}: {src: string, width: number, quality?: number}) {
  console.log([src, width, quality])
  return "/content/albums/mines-postcards/For Mine (sharing)-20.jpg"
}