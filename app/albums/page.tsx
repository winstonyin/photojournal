import AlbumItem from "../components/album-item"
import albums from "@/data/albums.json"

export default function Albums() {
  return (
    <div className="p-3 flex flex-wrap">
      {albums.map(a =>
        <AlbumItem key={a.i} src={a.images[0].src} url="albums/lake-serene" title={a.title} n_photos={a.total} />)}
    </div>
  )
}