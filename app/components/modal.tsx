'use client'

export default function Modal({children}: {children: React.ReactNode}) {
  return (
    <div className="fixed inset-0 backdrop-blur z-50">
      {children}
    </div>
  )
}