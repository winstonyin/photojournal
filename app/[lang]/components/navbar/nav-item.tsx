import Link from "next/link"

export default function NavItem({children, href}: {children: React.ReactNode, href: string}) {
  return (
    <li className="float-left">
      <Link
        href={href}
        className="grid w-16 h-16 place-items-center hover:bg-gray-800">
        {children}
      </Link>
    </li>
  )
}