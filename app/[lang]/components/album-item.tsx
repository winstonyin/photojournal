import Link from "next/link";
import Image from "next/image";
import { imageSize } from "../../helpers";
import config from "@/site-config.json"

export default function AlbumItem({url, title, cover, photo_count, album_count, lang}: {
  url: string,
  title: string,
  cover: string,
  photo_count: number,
  album_count: number,
  lang: string
}) {
  const photo_count_text = photo_count + config.t_photo_count[config.locales.findIndex(l => l == lang)]
  const album_count_text = album_count + config.t_album_count[config.locales.findIndex(l => l == lang)]

  return (
    <Link href={"/" + lang + url} className="inline-block w-[45vw] md:w-80 rounded-lg m-[1vw] md:m-1 pb-2 bg-gray-700 hover:scale-[1.02] transition-transform">
      <div className="relative h-[45vw] md:h-80 b-12 overflow-hidden rounded-t-lg justify-center align-middle">
        <Image
          src={imageSize(cover, 320)}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="block h-12 px-3 py-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
        <h3 className="font-bold overflow-hidden text-ellipsis">{title}</h3>
        {album_count ? <span className="text-gray-300 mr-3">{album_count_text}</span> : null}<span className="text-gray-300">{photo_count_text}</span>
      </div>
    </Link>
  )
}