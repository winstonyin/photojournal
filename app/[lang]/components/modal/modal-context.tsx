import { createContext, SetStateAction } from "react";

type ModalData = {
  show: boolean
  photos: {src: string, desc: string}[]
  active: number
}

export const default_modal_data: ModalData = {
  show: false,
  photos: [],
  active: 0
}

export const ModalContext = createContext({state: default_modal_data, setState: (a: SetStateAction<ModalData>) => {}})