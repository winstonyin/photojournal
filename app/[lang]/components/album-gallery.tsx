import AlbumItem from "./album-item"

export default function AlbumGallery({albums, start_key, lang}: {
  albums: {// TODO: declare global type
    url: string,
    title: string,
    cover: string,
    count: number
  }[],
  start_key: number,
  lang: string
}) {
  const album_array = albums.map((a, i) =>
    <AlbumItem
      key={i + start_key}
      url={a.url}
      title={a.title}
      cover={a.cover}
      count={a.count}
      lang={lang} />
  )

  return (
    <div>
      {album_array}
    </div>
  )
}