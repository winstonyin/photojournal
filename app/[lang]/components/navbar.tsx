export default function Navbar({children}: {children: React.ReactNode}) {
  return (
    <nav className="fixed z-40 bottom-0 left-0 h-12 w-full text-gray-100 md:top-0 md:w-16 md:h-full">
      <div className="flex w-full h-full px-10 bg-gray-900 md:flex-col md:px-0">
        {children}
      </div>
    </nav>
  )
}