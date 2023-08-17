'use client'

import { useRouter } from "next/navigation"
import { XMarkIcon } from "@heroicons/react/24/solid"

export default function Modal({children}: {children: React.ReactNode}) {
  const router = useRouter()

  return (
    <div className="fixed inset-0 backdrop-blur-lg z-50 flex items-center justify-center">
      {children}
      <div onClick={router.back} className="absolute top-2 left-2 w-10 h-10 grid content-center justify-center align-middle cursor-pointer text-gray-400 hover:text-gray-50 transition-colors">
        <XMarkIcon className="w-8 h-8" />
      </div>
    </div>
  )
}