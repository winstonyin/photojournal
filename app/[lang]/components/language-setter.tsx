"use client"

import React, { useContext, useEffect } from "react"
import { usePathname } from "next/navigation"
import { LanguageContext } from "./navbar/language-context"

export default function SlideshowSetter({langs, children}: {
  langs: string[],
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const {state: language_state, setState: setLanguageState} = useContext(LanguageContext)

  useEffect(() => {
    setLanguageState(langs)
  }, [pathname, langs, setLanguageState])

  return (
    <>
    {children}
    </>
  )
}