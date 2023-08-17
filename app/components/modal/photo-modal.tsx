import Modal from "../modal"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

export default function PhotoModal({src, prev, next} : {src: string, prev: number, next: number}) {
  return (
    <Modal>
      <Image
        src={src}
        alt="Lightbox"
        fill
        className="object-contain -z-10"
        // unoptimized
      />
      <div className="absolute bottom-0 h-24 w-full grid content-center justify-center align-middle bg-gray-900 bg-opacity-70">
        <div className="h-20 w-[1000px]">
          PLACEHOLDER METADATA
        </div>
      </div>
      {prev == -1 ? null :
        <Link href={"?photo=" + prev} replace={true}>
          <div className="absolute left-0 h-24 w-16 my-auto grid content-center justify-center align-middle rounded-r-lg text-gray-400 hover:text-gray-50 hover:bg-gray-700 hover:bg-opacity-90 transition-colors">
            <ChevronLeftIcon className="h-16 w-16" />
          </div>
        </Link>}
      {next == -2 ? null :
        <Link href={"?photo=" + next} replace={true}>
          <div className="absolute right-0 h-24 w-16 my-auto grid content-center justify-center align-middle rounded-l-lg text-gray-400 hover:text-gray-50 hover:bg-gray-700 hover:bg-opacity-90 transition-colors">
            <ChevronRightIcon className="h-16 w-16" />
          </div>
        </Link>}
    </Modal>
  )
}