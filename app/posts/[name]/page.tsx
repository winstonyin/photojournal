import Markdown from "markdown-to-jsx"
import Gallery from "@/app/components/gallery"
import PhotoModal from "@/app/components/modal/photo-modal"
import Image from "next/image"
import posts from "@/data/posts.json"
import { ChevronDownIcon } from "@heroicons/react/24/solid"

export default function PostPage({params, searchParams}: {params: {name: string}, searchParams: {photo: number}}) {
  const post = posts.find(p => p.name == decodeURIComponent(params.name))
  if (post) {
    let md = post.post
    let start_key = 0
    let srcs : string[] = []
    md = md.replace(/<Gallery>(.+?)<\/Gallery>/gs, (_, p1) => {
      let ret = "<Gallery start_key=\"" + start_key + "\">" + p1 + "</Gallery>"
      let matches = p1.match(/\/content\/albums\/.+/g)
      let n = matches?.length
      srcs = srcs.concat(matches)
      start_key += n
      return ret
    })
    const modal = searchParams.photo ?
      <PhotoModal src={srcs[searchParams.photo]} /> : null

    return (
      <>
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute w-full h-[calc(100%-8rem)]">
          <div className="relative w-full h-full">
            <Image
              src={post.featured}
              alt="featured photo"
              fill
              className="object-cover -z-10"
              unoptimized
            />
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-b from-transparent via-gray-100 to-gray-100 dark:via-gray-800 dark:to-gray-800"></div>
        <h1 className="absolute bottom-12 left-0 right-0 text-6xl text-center font-thin">{post.title}</h1>
        <div className="absolute bottom-0 left-0 right-0 text-gray-500">
          <ChevronDownIcon className="w-10 h-10 mx-auto"/>
        </div>
      </div>
      <div className="text-center mb-12 text-gray-500">{post.date}</div>
      <Markdown
        options={{
          overrides: {
            Gallery: {
              component: Gallery
            },
            p: {
              component: "p",
              props: {
                className: "mb-4"
              }
            }
          }
        }}
        className="m-auto p-3 w-[808px] text-xl font-thin"
      >
        {md}
      </Markdown>
      {modal}
      </>
    )
  }
}