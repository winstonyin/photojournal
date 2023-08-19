import Link from "next/link";
import Image from "next/image";
import { imageSize } from "./helpers";

export default function Photo({src, url}: {
  src: string,
  url: string,
}) {
  return (
    <Link href={url} scroll={false} className="relative inline-block overflow-visible hover:overflow-visible w-32 h-32 lg:w-48 lg:h-48 m-[1px] lg:m-0.5 bg-gray-500 justify-center align-middle hover:scale-[1.02] transition-transform">
      <div className="absolute w-32 h-32 lg:w-48 lg:h-48">
        <Image
          src={imageSize(src, 192)}
          alt="photo"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </Link>
  )
}