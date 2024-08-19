"use client"

import React, { useContext, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ModalContext } from "./modal-context"

export default function SlideshowSetter({photos, children}: {
  photos: {src: string, desc: string}[],
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const {state: modal_data, setState: setModalData} = useContext(ModalContext)

  useEffect(() => {
    setModalData({
      show: false,
      photos: photos,
      active: 0
    })
  }, [pathname, photos, setModalData])

  return (
    <>
    {children}
    </>
  )
}