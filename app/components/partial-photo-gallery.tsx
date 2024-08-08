import Image from "next/image"
import ModalLink from "./modal/modal-link"
import { imageSize } from "../helpers"

export default function PartialPhotoGallery({galleries, id}: {
  galleries: {
    src: string
    desc: string
  }[][],
  id: number,
}) {
  const start_key = galleries.slice(0, id).flat().length
  const photos = galleries[id]
  const photo_items = photos.map((s, i) =>
    <div key={i + start_key} className="relative inline-block overflow-visible hover:overflow-visible w-48 h-48 m-0.5 bg-gray-500 justify-center align-middle hover:scale-[1.03] transition-transform">
      <ModalLink photos={galleries.flat()} id={i + start_key}>
        <Image
          src={imageSize(s.src, 192)}
          alt="photo"
          fill
          className="object-cover"
          unoptimized
        />
      </ModalLink>
    </div>
  )

  return (
    <div className="flex flex-wrap mt-8 mb-8">
      {photo_items}
    </div>
  )
}