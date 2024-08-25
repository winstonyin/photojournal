import Link from "next/link"
import Image from "next/image"

export default function Logo({src, alt, lang} : {src: string, alt: string, lang: string}) {
  return (
    <div className="grid w-12 h-12 place-items-center md:w-16 md:h-20">
      <div className="w-9 h-9 md:w-12 md:h-12">
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