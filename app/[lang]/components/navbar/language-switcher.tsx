"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import config from "@/site-config.json";

export default function LanguageSwitcher({children}: {children: React.ReactNode}) {
  const pathname = usePathname()
  const i_path_locale = config.locales.findIndex(
    l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  ) || 0
  const next_locale = config.locales[(i_path_locale + 1) % config.locales.length]
  const next_url = pathname.replace(`/${config.locales[i_path_locale]}`, `/${next_locale}`)

  return (
    <li className="float-left">
      <Link
        href={next_url}
        className="grid w-16 h-16 place-items-center hover:bg-gray-800">
        {children}
      </Link>
    </li>
  )
}