'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { imageSize } from "./helpers"
import path from "path"

function randInt(max: number) {
  return Math.floor(Math.random() * max)
}

export default function ImageSwapper({srcs}: {srcs: string[]}) {
  const duration = 5000
  const p_change = 0.2
  const [currentIndex, setCurrentIndex] = useState(randInt(srcs.length))
  let url = path.dirname(srcs[currentIndex].substring(8))
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Math.random() < p_change) {
        setCurrentIndex(randInt(srcs.length))
        url = path.dirname(srcs[currentIndex].substring(8))
      }
    }, duration)
    
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Link href={url} className="inline-block w-80 h-80 rounded-lg m-1 hover:scale-[1.02] transition-transform">
      <div className="relative w-80 h-80 overflow-hidden rounded-lg justify-center align-middle">
        <Image
          src={imageSize(srcs[currentIndex], 320)}
          alt="photo"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </Link>
  )
}