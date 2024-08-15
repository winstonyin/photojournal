"use client"

import { useContext } from "react"
import { ModalContext } from "./modal-context"

export default function ModalLink({id, children}: {
  id: number,
  children: React.ReactNode}) {
  const {state: modal_data, setState: setModalData} = useContext(ModalContext)
  const openModal = () => setModalData({
    show: true,
    photos: modal_data.photos,
    active: id
  }) // TODO: consolidate openModal and closeModal at the wrapper level

  return (
    <div onClick={openModal} className="absolute w-48 h-48 cursor-pointer">
      {children}
    </div>
  )
}