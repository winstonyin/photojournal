import Markdown from "markdown-to-jsx"
import Gallery from "@/app/components/gallery"
import PhotoModal from "@/app/components/modal/photo-modal"
import posts from "@/data/posts.json"

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
      <h1 className="mt-5 mb-2 text-6xl text-center font-thin">{post.title}</h1>
      <div className="text-center mb-14 text-gray-500">{post.date}</div>
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