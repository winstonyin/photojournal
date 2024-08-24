import { ChevronRightIcon } from "@heroicons/react/16/solid"
import { Fragment } from "react"
import Link from "next/link"

export default function Breadcrumb({url, lang, crumbs, title}: {
  url: string,
  lang: string,
  crumbs: string[],
  title: string
}) {
  const url_segments = url.split("/")
  const linked_crumbs = crumbs.map((c, i) => (
    <Fragment key={"frag" + i}>
      <Link href={"/" + lang + url_segments.slice(0, i+2).join("/")}>{c}</Link>
      {(i < crumbs.length-1) ? <ChevronRightIcon className="inline w-4 h-4" /> : null}
    </Fragment>
  ))

  return (
    <div className="mb-2 pl-2 w-full font-thin">
      <h1 className="text-3xl">{title}</h1>
      {(url == "/albums") ? null : <h2 className="text-gray-300">{linked_crumbs}</h2>}
    </div>
  )
}