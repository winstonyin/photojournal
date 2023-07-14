import Photo from "@/app/components/photo"

export default function LakeSerene() {
  return (
    <div className="p-3 flex flex-wrap">
      <Photo src="/smith_rock.jpg" url="/posts" />
      <Photo src="/campanile.jpg" url="/posts" />
    </div>
  )
}