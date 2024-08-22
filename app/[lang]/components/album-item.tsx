import Link from "next/link";
import Image from "next/image";
import { imageSize } from "../../helpers";
import config from "@/site-config.json"

export default function AlbumItem({url, title, cover, count, lang}: {
  url: string,
  title: string,
  cover: string,
  count: number,
  lang: string
}) {
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
        <p className="text-gray-300">{count}{config.t_photo_count[config.locales.findIndex(l => l == lang)]}</p>
      </div>
    </Link>
  )
}