import Photo from "@/app/components/photo"
import PhotoModal from "@/app/components/modal/photo-modal"
import albums from "@/data/albums.json"

export default function AlbumPage({params, searchParams}: {params: {path: string[]}, searchParams: {photo: number}}) {
  const album_name = decodeURIComponent(params.path[0])
  const photos = (albums.find(a => a.title == album_name) || {images: []}).images
  const modal = searchParams.photo ? 
    <PhotoModal src={(photos.find(p => p.i == searchParams.photo) || {src: ""}).src} /> : null

  return (
    <>
    <div className="p-3 flex flex-wrap">
      {photos.map(p => 
        <Photo key={p.i} src={p.src} url={"?photo=" + p.i} />
      )}
    </div>
    {modal}
    </>
  )
}