import Modal from "../modal"
import Image from "next/image"

export default function PhotoModal({src} : {src: string}) {
  return (
    <Modal>
      <Image
        src={src}
        alt="Lightbox"
        fill
        className="object-contain"
        sizes="(max-width: 3000px) 100vw"
      />
    </Modal>
  )
}