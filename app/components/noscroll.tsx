'use client'

import { useState } from "react"

export default function NoScroll({noscroll}: {noscroll: boolean}) {
  // const [scrollable, setScrollable] = useState(!noscroll)

  // const toggleScrollable = (checked: boolean) => {
  //   if (checked) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // };






  // useEffect(() => {
  //   return () => {
  //     console.log(noscroll)
  //     if (noscroll && !document.body.classList.contains('overflow-hidden')) {
  //       document.body.classList.add('overflow-hidden')
  //     } else if (!noscroll && document.body.classList.contains('overflow-hidden')) {
  //       document.body.classList.remove('overflow-hidden')
  //     }
  //   }
  // }, [])
  return <></>
}