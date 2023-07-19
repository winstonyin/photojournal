import AlbumItem from "@/app/components/album-item"
import Photo from "@/app/components/photo"
import PhotoModal from "@/app/components/modal/photo-modal"
import albums from "@/data/albums.json"

export default function AlbumPage({params, searchParams}: {params: {path: string[]}, searchParams: {photo: number}}) {
  const album_url = params.path ? "/content/albums/" + decodeURIComponent(params.path.join("/")) : "/content/albums"
  const album_entry = albums.find(a => a.url == album_url)
  if (album_entry && album_entry.kind == 1) {
    // directory of albums
    let contents = album_entry.albums
    if (contents) {
      return (
        <div className="p-3 flex flex-wrap">
          {contents.map(c =>
            <AlbumItem key={c.i} src="/sdlkjf.jpg" url={c.url.substring(8)} title={c.title} n_photos={10} />
          )}
        </div>
      )}
    return <p>{album_url} is empty for some reason</p>
  } else if (album_entry && album_entry.kind == 0) {
    // album of images
    let contents = album_entry.images
    if (contents) {
      const modal = searchParams.photo ?
        <PhotoModal src={(contents.find(c => c.i == searchParams.photo) || {src: ""}).src} /> : null
      return (
        <>
        <div className="p-3 flex flex-wrap">
          {contents.map(c =>
            <Photo key={c.i} src={c.src} url={"?photo=" + c.i} />
          )}
        </div>
        {modal}
        </>
      )
    }
    return <p>{album_url} is empty for some reason</p>
  } else {
    return <p>{album_url} not found in file system</p>
  }
}