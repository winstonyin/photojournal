import Link from "next/link";
import Image from "next/image";

export default function Photo({src, url}: {
  src: string,
  url: string,
}) {
  return (
    <div className="relative inline-block overflow-visible hover:overflow-visible w-48 h-48 m-0.5 bg-gray-500 justify-center align-center hover:scale-[1.02] transition-transform">
      <Link href={url}>
        <Image
          src={src}
          alt="photo"
          fill
          className="object-cover"
          sizes="320px"
        />
      </Link>
    </div>
  )
}