import Modal from "../../components/modal";
import Image from "next/image";

export default function PhotoModal() {
  return (
    <Modal>
      <Image
        src="/lake_serene.jpg"
        alt="Lightbox"
        fill
        className="object-contain"
      />
    </Modal>
  )
}