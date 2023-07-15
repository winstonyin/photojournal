'use client'
import { useRouter } from "next/navigation"

export default function Modal({children}: {children: React.ReactNode}) {
  const router = useRouter()

  return (
    <div
      className="fixed inset-0 backdrop-blur-lg z-50 flex items-center justify-center"
      onClick={() => router.back()}>
      {children}
    </div>
  )
}