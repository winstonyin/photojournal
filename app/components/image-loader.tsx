'use client'
import { imageSize } from "./helpers"

// avoid dynamically generating thumnails
export default function imageLoader({src, width, quality}: {src: string, width: number, quality?: number}) {
  return imageSize(src, width)
}