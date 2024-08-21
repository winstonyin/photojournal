"use client"

import { useCallback, useContext, useEffect } from "react"
import { ModalContext } from "./modal-context"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { imageSize } from "@/app/helpers"

export default function Modal() {
  const {state: modal_data, setState: setModalData} = useContext(ModalContext)
  const closeModal = () => setModalData({
    show: false,
    photos: modal_data.photos,
    active: 0
  })
  const goLeft = () => modal_data.active == 0 ? void 0 : setModalData({
    show: modal_data.show,
    photos: modal_data.photos,
    active: modal_data.active - 1
  })
  const goRight = () => (modal_data.active == modal_data.photos.length - 1) ? void 0 : setModalData({
    show: modal_data.show,
    photos: modal_data.photos,
    active: modal_data.active + 1
  })
  useHandleKey("Escape", closeModal)
  useHandleKey("ArrowLeft", goLeft)
  useHandleKey("ArrowRight", goRight)

  return modal_data.show ? (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-lg z-50 flex items-center justify-center no-doc-scroll">
      <div className="relative h-4/5 w-4/5 -z-10 select-none">
        <Image
          src={imageSize(modal_data.photos[modal_data.active].src, 2048)}
          alt="Lightbox"
          fill
          priority
          className="object-contain"
          unoptimized
        />
      </div>
      <div className="absolute bottom-0 h-20 w-1/2 mx-0 mb-5 grid content-center justify-center align-middle text-gray-100 overflow-scroll">
        {modal_data.photos[modal_data.active].desc}
      </div>
      {modal_data.active == 0 ? null : (
        <div onClick={goLeft} className="absolute left-0 h-24 w-16 my-auto grid content-center justify-center align-middle rounded-r-lg cursor-pointer select-none text-gray-400 hover:text-gray-50 hover:bg-gray-700 hover:bg-opacity-90 transition-colors">
          <ChevronLeftIcon className="h-16 w-16" />
        </div>
      )}
      {modal_data.active == modal_data.photos.length - 1 ? null : (
        <div onClick={goRight} className="absolute right-0 h-24 w-16 my-auto grid content-center justify-center align-middle rounded-l-lg cursor-pointer select-none text-gray-400 hover:text-gray-50 hover:bg-gray-700 hover:bg-opacity-90 transition-colors">
          <ChevronRightIcon className="h-16 w-16" />
        </div>
      )}
      <div onClick={closeModal} className="absolute top-2 left-2 w-10 h-10 grid content-center justify-center align-middle cursor-pointer select-none text-gray-50 transition-colors">
        <XMarkIcon className="w-8 h-8" />
      </div>
    </div>
  ) : null
}

function useHandleKey(key: string, f: () => void) {
  const keyEffect = useCallback((e: KeyboardEvent) => {
    if (e.key === key) {
      f()
    }
  }, [key, f])

  useEffect(() => {
    document.addEventListener("keydown", keyEffect, false)
    return () => {
      document.removeEventListener("keydown", keyEffect, false)
    }
  }, [keyEffect])
}