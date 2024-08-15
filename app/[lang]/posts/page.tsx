import posts from "@/data/posts.json"
import PostItem from "../components/post-item"

export default function PostsPage() {
  const post_items = posts.map((p, i) =>
    <PostItem
      key={i}
      url={"/posts/" + p.slug}
      title={p.title}
      date={p.date}
      cover={p.cover}
      count={p.count}
      blurb={p.blurb}
    />
  )

  return (
    <div className="flex flex-wrap p-3">
      {post_items}
    </div>
  )
}