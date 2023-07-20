import AlbumItem from "@/app/components/album-item"
import Photo from "@/app/components/photo"
import PhotoModal from "@/app/components/modal/photo-modal"
import albums from "@/data/albums.json"

export default function AlbumPage({params, searchParams}: {params: {path: string[]}, searchParams: {photo: number}}) {
  const album_url = params.path ? "/content/albums/" + decodeURIComponent(params.path.join("/")) : "/content/albums"
  const album_entry = albums.find(a => a.url == album_url)
  let breadcrumb_array = album_entry ? album_entry.url.split("/").slice(2) : []
  breadcrumb_array[0] = "All Albums"
  const breadcrumb = breadcrumb_array.join(" > ")
  if (album_entry && album_entry.kind == 1) {
    // directory of albums
    let contents = album_entry.albums
    if (contents) {
      return (
        <div className="p-3 flex flex-wrap">
          <div className="pl-2 w-full text-3xl font-thin">
            {breadcrumb}
          </div>
          {contents.map(c =>
            <AlbumItem key={c.i} src={c.cover} url={c.url.substring(8)} title={c.title} n_photos={c.n_photos} />
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
          <div className="pl-2 w-full text-3xl font-thin">
            {breadcrumb}
          </div>
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