import posts from "@/data/posts.json"
import PostItem from "../components/post-item"
import config from "@/site-config.json"
import { url } from "inspector"

// TODO: declare types
export default function PostsPage({params}: {params: {lang: string}}) {
  const post_items = posts.map(p => {
    const ind = p.posts.findIndex(pp => pp.lang == params.lang)
    if (ind >= 0) {
      const pp = p.posts[ind]
      return {
        slug: p.slug,
        url: pp.title,
        title: pp.title,
        date: pp.date,
        cover: pp.cover,
        count: pp.count,
        blurb: pp.blurb
      }
    } else {
      return {
        slug: "",
        url: "",
        title: "",
        date: "",
        cover: "",
        count: 0,
        blurb: ""
      }
    }
  }).filter(p => p.slug !== "").sort((a, b) => parseInt(b.date) - parseInt(a.date)).map((p, i) =>
    <PostItem
      key={i}
      url={"/" + params.lang + "/posts/" + p.slug}
      title={p.title}
      date={p.date}
      cover={p.cover}
      count={p.count}
      blurb={p.blurb}
    />
  )

  return (
    <div className="flex flex-wrap pt-3 pb-16">
      {post_items}
    </div>
  )
}

export function generateStaticParams() {
  const paths = config.locales.map(l => ({lang: l}))
  return paths
}