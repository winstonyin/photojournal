import Link from "next/link"

export default function NavItem({children, href}: {children: React.ReactNode, href: string}) {
  return (
    <li className="float-left">
      <Link
        href={href}
        className="grid w-12 h-12 place-items-center hover:bg-gray-800 md:w-16 md:h-16">
        {children}
      </Link>
    </li>
  )
}