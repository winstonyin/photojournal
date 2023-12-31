import PostItem from "../components/post-item"
import posts from "@/data/posts.json"

export default function Posts() {
  return (
    <div className="flex flex-wrap p-3">
    {posts.map((p, i) =>
      <PostItem
        key={i}
        href={"posts/" + p.name}
        title={p.title}
        date={p.date}
        featured={p.featured}
        n_photos={p.n_photos}
        blurb={p.blurb}
      />
    )}
    </div>
  )
}