import Link from "next/link"
import Image from "next/image"

export default function Logo({src, alt, lang} : {src: string, alt: string, lang: string}) {
  return (
    <div className="grid w-16 h-20 place-items-center">
      <div className="w-12 h-12">
        <Link href={"/" + lang}>
          <Image
            src={src}
            alt={alt}
            width={48}
            height={48}
            unoptimized // don't go through imageLoader
          />
        </Link>
      </div>
    </div>
  )
}