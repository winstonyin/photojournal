import Link from "next/link";
import Image from "next/image";
import { imageSize } from "./helpers";

export default function AlbumItem(props: {
  src: string,
  url: string,
  title: string,
  n_photos: number
}) {
  return (
    <Link href={props.url} className="inline-block w-52 h-64 lg:w-80 lg:h-96 rounded-lg m-1 bg-gray-300 dark:bg-gray-700 lg:hover:scale-[1.02] transition-transform">
      <div className="relative w-52 h-52 lg:w-80 lg:h-80 overflow-hidden rounded-t-lg justify-center align-middle">
        <Image
          src={imageSize(props.src, 320)}
          alt={"Album - " + props.title}
          fill
          priority
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="block w-52 lg:w-80 h-12 px-2 py-1 lg:px-3 lg:py-2 text-sm">
        <h3 className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">{props.title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{props.n_photos} photos</p>
      </div>
    </Link>
  )
}