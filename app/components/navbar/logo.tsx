import Link from "next/link"
import Image from "next/image"

export default function Logo() {
  return (
    <div className="grid w-14 h-12 lg:w-16 lg:h-20 place-items-center">
      <div className="w-10 h-10 lg:w-12 lg:h-12">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Yin"
            width={48}
            height={48}
            unoptimized // don't go through imageLoader
          />
        </Link>
      </div>
    </div>
  )
}