import Link from "next/link"
import Image from "next/image"
import { imageSize } from "./helpers"

export default function PostItem(props: {
  href: string,
  title: string,
  date: string,
  featured: string,
  n_photos: number,
  blurb: string
}) {
  return (
    <Link href={props.href} className="flex w-[660px] h-56 rounded-lg m-1 bg-gray-300 dark:bg-gray-700 hover:scale-[1.01] transition-transform">
      <div className="relative w-56 h-56 overflow-hidden rounded-l-lg justify-center align-middle">
        <Image
          src={imageSize(props.featured, 224)}
          alt="featured photo"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col justify-between px-4 py-6 overflow-hidden">
        <div>
          <h3 className="mb-4 text-2xl whitespace-nowrap overflow-hidden text-ellipsis">{props.title}</h3>
          <p className="w-[404px] h-6 whitespace-nowrap overflow-hidden text-ellipsis">{props.blurb}</p>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300">date: {props.date}</p>
          <p className="text-gray-700 dark:text-gray-300">{props.n_photos} photos</p>
        </div>
      </div>
    </Link>
  )
}