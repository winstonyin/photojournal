import Link from "next/link"
import Image from "next/image"
import { imageSize } from "../helpers"

export default function PostItem({url, title, date, cover, count, blurb}: {
  url: string,
  title: string,
  date: string,
  cover: string,
  count: number,
  blurb: string
}) {
  return (
    <Link href={url} className="flex w-[660px] h-56 rounded-lg m-1 bg-gray-700 hover:scale-[1.01] transition-transform">
      <div className="relative w-56 h-56 overflow-hidden rounded-l-lg justify-center align-middle">
        <Image
          src={imageSize(cover, 224)}
          alt="featured photo"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col justify-between px-4 py-6 overflow-hidden">
        <div>
          <h3 className="mb-4 text-2xl whitespace-nowrap overflow-hidden text-ellipsis">{title}</h3>
          <p className="w-[404px] h-6 whitespace-nowrap overflow-hidden text-ellipsis">{blurb}</p>
        </div>
        <div>
          <p className="text-gray-300">date: {date}</p>
          <p className="text-gray-300">{count} photos</p>
        </div>
      </div>
    </Link>
  )
}