import Link from "next/link"
import Image from "next/image"

export default function Logo() {
  return (
    <div className="grid h-20 place-items-center">
      <div className="w-12 h-12">
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