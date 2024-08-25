import posts from "@/data/posts.json"
import PostItem from "../components/post-item"
import config from "@/site-config.json"

export default function PostsPage({params}: {params: {lang: string}}) {
  const post_items = posts.map((p, i) => {
    const matching_post = p.posts.find(pl => pl.lang == params.lang)
    if (matching_post) {
      return (
        <PostItem
          key={i}
          url={"/" + params.lang + "/posts/" + p.slug}
          title={matching_post.title}
          date={matching_post.date}
          cover={matching_post.cover}
          count={matching_post.count}
          blurb={matching_post.blurb}
        />
      )
    }
  })

  return (
    <div className="flex flex-wrap py-3 md:p-3">
      {post_items}
    </div>
  )
}

export function generateStaticParams() {
  const paths = config.locales.map(l => ({lang: l}))
  return paths
}