export default function Navbar({children}: {children: React.ReactNode}) {
  return (
    <nav id="sidebar" className="fixed top-0 left-0 z-40 w-16 h-full text-gray-100">
      <div className="flex flex-col w-full h-full bg-gray-900">
        {children}
      </div>
    </nav>
  )
}