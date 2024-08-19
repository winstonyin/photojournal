"use client"

import { useState } from "react"
import { LanguageContext } from "./navbar/language-context"

export default function LanguageWrapper({children}: {children: React.ReactNode}) {
  const [language_data, setLanguageData] = useState([] as string[])

  return (
    <LanguageContext.Provider value={{state: language_data, setState: setLanguageData}}>
      {children}
    </LanguageContext.Provider>
  )
}