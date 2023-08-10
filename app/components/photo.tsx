import Link from "next/link";
import Image from "next/image";
import { imageSize } from "./helpers";

export default function Photo({src, url}: {
  src: string,
  url: string,
}) {
  return (
    <div className="relative inline-block overflow-visible hover:overflow-visible w-48 h-48 m-0.5 bg-gray-500 justify-center align-center hover:scale-[1.02] transition-transform">
      <Link href={url} className="absolute w-48 h-48">
        <Image
          src={imageSize(src, 192)}
          alt="photo"
          fill
          className="object-cover"
        />
      </Link>
    </div>
  )
}