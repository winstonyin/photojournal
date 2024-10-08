import Image from "next/image"
import ModalLink from "./modal/modal-link"
import { imageSize } from "../../helpers"

export default function PhotoGallery({photos, start_key}: {
  photos: {
    src: string
    desc: string
  }[],
  start_key: number
}) {
  const photo_array = photos.map((p, i) => 
    // n(1 + w) = 100 (w(n=4) = 24; w(n=5) = 19)
    <div key={i + start_key} className="relative inline-block overflow-visible hover:overflow-visible w-[24vw] h-[24vw] m-[0.5vw] md:w-48 md:h-48 md:m-0.5 bg-gray-500 justify-center align-middle hover:scale-[1.03] transition-transform">
      <ModalLink id={i + start_key}>
        <Image
          src={imageSize(p.src, 192)}
          alt="photo"
          fill
          className="object-cover"
          unoptimized
        />
      </ModalLink>
    </div>
  )

  return (
    <>
    {photo_array}
    </>
  )
}