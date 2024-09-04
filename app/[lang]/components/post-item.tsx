import Link from "next/link"
import Image from "next/image"
import { imageSize } from "../../helpers"

// TODO: format date by language
export default function PostItem({url, title, date, cover, count, blurb}: {
  url: string,
  title: string,
  date: string,
  cover: string,
  count: number,
  blurb: string
}) {
  return (
    <Link href={url} className="flex w-[98vw] md:w-[660px] m-[1vw] md:h-56 rounded-lg md:m-1 bg-gray-700 hover:scale-[1.01] transition-transform">
      <div className="relative w-[max(20vw,130px)] h-[max(20vw,130px)] md:w-56 md:h-56 overflow-hidden rounded-l-lg justify-center align-middle">
        <Image
          src={imageSize(cover, 224)}
          alt="featured photo"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col justify-between w-[72vw] md:w-[436px] px-2 py-2 md:px-4 md:py-6 overflow-hidden">
        <div>
          <h3 className="mb-4 text-xl md:text-2xl whitespace-nowrap overflow-hidden text-ellipsis">{title}</h3>
          <p className="h-6 text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">{blurb}</p>
        </div>
        <div className="text-sm md:text-base text-gray-300">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">{date}</p>
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">{count} photos</p>
        </div>
      </div>
    </Link>
  )
}