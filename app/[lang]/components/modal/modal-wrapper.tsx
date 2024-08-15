"use client"

import { useState } from "react"
import Modal from "./modal"
import { default_modal_data, ModalContext } from "./modal-context"

export default function ModalWrapper({children}: {children: React.ReactNode}) {
  const [modal_data, setModalData] = useState(default_modal_data)

  return (
    <ModalContext.Provider value={{state: modal_data, setState: setModalData}}>
      {children}
      <Modal />
    </ModalContext.Provider>
  )
}