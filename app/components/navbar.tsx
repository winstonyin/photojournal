'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'
import Logo from "./navbar/logo"
import ThemeToggle from "./navbar/theme-toggle"
import { LanguageIcon, PhotoIcon, NewspaperIcon } from "@heroicons/react/24/solid"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav id="sidebar" className="fixed top-0 left-0 z-40 h-12 w-full lg:w-16 lg:h-full text-gray-900 dark:text-gray-100">
      <div className="flex lg:flex-col w-full lg:h-full bg-gray-50 dark:bg-gray-900">
        <Logo />
        <div className="flex-1">
          <ul>
            <li className="float-left">
              <Link
                href="/albums"
                className={pathname.startsWith("/albums") ?
                  "grid w-12 h-12 lg:w-16 lg:h-16 place-items-center bg-gray-100 dark:bg-gray-800" :
                  "grid w-12 h-12 lg:w-16 lg:h-16 place-items-center hover:bg-gray-100 dark:hover:bg-gray-800"}>
                <PhotoIcon className="w-6 h-6 lg:w-7 lg:h-7" />
              </Link>
            </li>
            <li className="float-left">
              <Link
                href="/posts"
                className={pathname.startsWith("/posts") ?
                  "grid w-12 h-12 lg:w-16 lg:h-16 place-items-center bg-gray-100 dark:bg-gray-800" :
                  "grid w-12 h-12 lg:w-16 lg:h-16 place-items-center hover:bg-gray-100 dark:hover:bg-gray-800"}>
                <NewspaperIcon className="w-6 h-6 lg:w-7 lg:h-7" />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="float-left">
              <div className="grid w-12 h-12 lg:w-16 lg:h-16 place-items-center hover:bg-gray-100 dark:hover:bg-gray-800">
                <LanguageIcon className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
            </li>
            <li className="float-left">
              <div className="grid w-12 h-12 lg:w-16 lg:h-16 place-items-center hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="hidden lg:block"><ThemeToggle size={28}/></div>
                <div className="lg:hidden"><ThemeToggle size={20}/></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}