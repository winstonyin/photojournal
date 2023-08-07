'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'
import Logo from "./navbar/logo"
import ThemeToggle from "./navbar/theme-toggle"
import { LanguageIcon, PhotoIcon, NewspaperIcon } from "@heroicons/react/24/solid"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav id="sidebar" className="fixed top-0 left-0 z-40 w-20 h-screen text-gray-900 dark:text-gray-100">
      <div className="flex flex-col h-full overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <Logo />
        <div className="flex-1">
          <ul>
            <li>
              <Link
                href="/albums"
                className={pathname.startsWith("/albums") ?
                  "grid h-16 place-items-center bg-gray-100 dark:bg-gray-800" :
                  "grid h-16 place-items-center hover:bg-gray-100 dark:hover:bg-gray-800"}>
                <PhotoIcon className="w-7 h-7" />
              </Link>
            </li>
            <li>
              <Link
                href="/posts"
                className={pathname.startsWith("/posts") ?
                  "grid h-16 place-items-center bg-gray-100 dark:bg-gray-800" :
                  "grid h-16 place-items-center hover:bg-gray-100 dark:hover:bg-gray-800"}>
                <NewspaperIcon className="w-7 h-7" />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <div className="grid h-16 place-items-center hover:bg-gray-100 dark:hover:bg-gray-800">
                <LanguageIcon className="w-7 h-7" />
              </div>
            </li>
            <li>
              <div className="grid h-16 place-items-center hover:bg-gray-100 dark:hover:bg-gray-800">
                <ThemeToggle />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}