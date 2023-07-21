import AlbumItem from "@/app/components/album-item"
import Photo from "@/app/components/photo"
import PhotoModal from "@/app/components/modal/photo-modal"
import albums from "@/data/albums.json"
import Link from "next/link"

export default function AlbumPage({params, searchParams}: {params: {path: string[]}, searchParams: {photo: number}}) {
  const album_url = params.path ? "/albums/" + decodeURIComponent(params.path.join("/")) : "/albums"
  const album_entry = albums.find(a => a.url == album_url)

  // format breadcrumb
  let url_segments = album_entry ? album_entry.url.split("/").slice(1) : []
  console.log(url_segments)
  let breadcrumb_array = []
  for (let i = 0; i < url_segments.length; i++) {
    // link all except the last (current) segment
    let breadcrumb_entry = albums.find(a => a.url == "/" + url_segments.slice(0, i+1).join("/"))
    let title = breadcrumb_entry ? breadcrumb_entry.title : "Undefined"
    breadcrumb_array.push(
      i < url_segments.length-1 ?
        <Link href={"/" + url_segments.slice(0, i+1).join("/")}>
          {title}
        </Link> :
        <>{title}</>
    )
  }

  if (album_entry && album_entry.kind == 1) {
    // directory of albums
    let contents = album_entry.albums
    if (contents) {
      return (
        <div className="p-3 flex flex-wrap">
          <div className="pl-2 w-full text-3xl font-thin">
            {breadcrumb_array.map((b, i) => (
              i < breadcrumb_array.length-1 ? <>{b}&nbsp;&gt;&nbsp;</> : b
            ))}
          </div>
          {contents.map((c, i) =>
            <AlbumItem key={i} src={c.cover} url={c.url} title={c.title} n_photos={c.n_photos} />
          )}
        </div>
      )}
    return <p>{album_url} is empty for some reason</p>
  } else if (album_entry && album_entry.kind == 0) {
    // album of images
    let contents = album_entry.images
    if (contents) {
      const modal = searchParams.photo ?
        <PhotoModal src={contents[searchParams.photo].src} /> : null
      return (
        <>
        <div className="p-3 flex flex-wrap">
          <div className="pl-2 w-full text-3xl font-thin">
            {breadcrumb_array.map((b, i) => (
              i < breadcrumb_array.length-1 ? <>{b}&nbsp;&gt;&nbsp;</> : b
            ))}
          </div>
          {contents.map((c, i) =>
            <Photo key={i} src={c.src} url={"?photo=" + i} />
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