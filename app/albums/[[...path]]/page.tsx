import AlbumItem from "@/app/components/album-item"
import Photo from "@/app/components/photo"
import PhotoModal from "@/app/components/modal/photo-modal"
import albums from "@/data/albums.json"
import Link from "next/link"
import NoScroll from "@/app/components/noscroll"

export default function AlbumPage({params}: {params: {path: string[]}}) {
  const is_photo = params.path ? /^photo\d+$/.test(params.path[params.path.length-1]) : false
  const params_path = is_photo ? params.path.slice(0, params.path.length-1) : params.path
  const album_url = params_path ? "/albums/" + decodeURIComponent(params_path.join("/")) : "/albums"
  const album_entry = albums.find(a => a.url == album_url)

  // format breadcrumb
  let url_segments = album_entry ? album_entry.url.split("/").slice(1) : []
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
        <div className="lg:pt-3 flex flex-wrap">
          <div className="mb-2 pl-2 w-full text-2xl lg:text-3xl font-thin">
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
    let modal = null
    let noscroll = null
    if (contents) {
      if (is_photo) {
        noscroll = <NoScroll noscroll={true} />
        let n_match = params.path[params.path.length-1].match(/\d+/)
        let n_photo = parseInt(n_match ? n_match[0] : '-1')
        let prev = n_photo - 1
        let next = contents.length == +n_photo+1 ? -2 : +n_photo + 1
        let prev_src = prev == -1 ? "" : contents[prev].src
        let next_src = next == -2 ? "" : contents[next].src
        modal = <PhotoModal
          base_url={album_url}
          src={contents[n_photo].src}
          prev_src={prev_src}
          next_src={next_src}
          prev={prev}
          next={next}
        />
      } else {
        noscroll = <NoScroll noscroll={false} />
      }
      return (
        <>
        <div className="lg:pt-3 flex flex-wrap">
          <div className="mb-2 pl-2 w-full text-2xl lg:text-3xl font-thin">
            {breadcrumb_array.map((b, i) => (
              i < breadcrumb_array.length-1 ? <>{b}&nbsp;&gt;&nbsp;</> : b
            ))}
          </div>
          {contents.map((c, i) =>
            <Photo key={i} src={c.src} url={album_url + "/photo" + i} />
          )}
        </div>
        {modal}
        {noscroll}
        </>
      )
    }
    return <p>{album_url} is empty for some reason</p>
  } else {
    return <p>{album_url} not found in file system</p>
  }
}