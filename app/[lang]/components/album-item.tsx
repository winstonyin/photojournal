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
    <Link href={url} className="inline-block w-80 h-96 rounded-lg m-1 bg-gray-700 hover:scale-[1.02] transition-transform">
      <div className="relative w-80 h-80 overflow-hidden rounded-t-lg justify-center align-middle">
        <Image
          src={imageSize(cover, 320)}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="block w-80 h-12 px-3 py-2 text-sm">
        <h3 className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">{title}</h3>
        {album_count ? <span className="text-gray-300 mr-3">{album_count_text}</span> : null}<span className="text-gray-300">{photo_count_text}</span>
      </div>
    </Link>
  )
}