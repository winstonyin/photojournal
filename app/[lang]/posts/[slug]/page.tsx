import Image from "next/image"
import Markdown from "markdown-to-jsx"
import PartialPhotoGallery from "@/app/[lang]/components/partial-photo-gallery"
import SlideshowSetter from "@/app/[lang]/components/slideshow-setter"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import posts from "@/data/posts.json"
import config from "@/site-config.json"

export default function Post({params}: {params: {lang: string, slug: string}}) {
  const post = posts.find(p => p.slug == decodeURIComponent(params.slug)) ||
    {slug: "", title: "", date: "", cover: "", count: "", blurb: "", post: "", galleries: []}

  return (// Put some things in components!
    <SlideshowSetter photos={post.galleries.flat()}>
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute w-full h-[calc(100%-8rem)]">
          <div className="relative w-full h-full">
            <Image
              src={post.cover} // TODO: this currently loads the FULL master image
              alt="cover photo"
              fill
              className="object-cover -z-10"
              unoptimized
            />
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-b from-transparent via-gray-800 to-gray-800"></div>
        <h1 className="absolute bottom-12 left-0 right-0 text-6xl text-center font-thin">{post.title}</h1>
        <div className="absolute bottom-0 left-0 right-0 text-gray-500">
          <ChevronDownIcon className="w-10 h-10 mx-auto"/>
        </div>
      </div>
      <div className="text-center mb-12 text-gray-500">{post.date}</div>
      <Markdown
        options={{
          overrides: {
            gallery: {
              component: PartialPhotoGallery,
              props: {
                galleries: post.galleries
              }
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
        {post.post}
      </Markdown>
    </SlideshowSetter>
  )
}

export function generateStaticParams() {
  const slugs = posts.map(p => config.locales.map(l => ({lang: l, slug: p.slug}))).flat()
  return slugs
}