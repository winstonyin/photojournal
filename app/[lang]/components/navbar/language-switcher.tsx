"use client"

import { useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageContext } from "./language-context";
import config from "@/site-config.json";

export default function LanguageSwitcher({children}: {children: React.ReactNode}) {
  const pathname = usePathname()
  const is_post = config.locales.some(l =>
    pathname.startsWith(`/${l}/posts/`)
  )
  const {state: language_state, setState: setLanguageState} = useContext(LanguageContext)
  const i_path_locale = is_post ? language_state.findIndex(l =>
    pathname.startsWith(`/${l}/posts/`)
  ) : config.locales.findIndex(l =>
    pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  ) || 0
  useEffect(() => {
    setLanguageState(language_state)
  }, [pathname, language_state, setLanguageState])
  const disabled = is_post && language_state.length <= 1
  // TODO: adjust locale array for each post based on available languages
  const next_locale = is_post ? language_state[(i_path_locale + 1) % language_state.length] : config.locales[(i_path_locale + 1) % config.locales.length]
  // TODO: potential issues: locales with special symboles like - and . ??
  const next_url = pathname.replace(`/${config.locales[i_path_locale]}`, `/${next_locale}`)

  return (
    <li className="float-left">
      {disabled ?
        <div
          // href={next_url}
          className="grid w-16 h-16 place-items-center text-gray-400"
          // aria-disabled="true"
          // tabIndex={-1} >
          >
          {children}
        </div> :
        <Link
          href={next_url}
          className="grid w-16 h-16 place-items-center hover:bg-gray-800"
          scroll={false} >
          {children}
        </Link>}
    </li>
  )
}