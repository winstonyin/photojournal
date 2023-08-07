import PostItem from "../components/post-item"
import posts from "@/data/posts.json"

export default function Posts({params, searchParams}: {params: {path: string[]}, searchParams: {photo: number}}) {
  return (
    <div className="p-3">
    {posts.map(p =>
      <PostItem
        href={"posts/" + p.name}
        title={p.title}
        date={p.date}
      />
    )}
    </div>
  )
}