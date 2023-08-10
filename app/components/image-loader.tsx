'use client'

// avoid dynamically generating thumnails
export default function imageLoader({src, width, quality}: {src: string, width: number, quality?: number}) {
  return src
}