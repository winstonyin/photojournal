import Photo from "@/app/components/photo"
import albums from "@/data/albums.json"

export default function LakeSerene({params}: {params: {path: string[]}}) {
  const album_name = decodeURIComponent(params.path[0])
  const photos = (albums.find(a => a.title == album_name) || {images: []}).images

  return (
    <div className="p-3 flex flex-wrap">
      {photos.map(p => 
        <Photo src={p.src} url="posts" />
      )}
    </div>
  )
}