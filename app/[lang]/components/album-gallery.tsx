import AlbumItem from "./album-item"

export default function AlbumGallery({albums, start_key, lang}: {
  albums: {// TODO: declare global type
    url: string,
    title: string,
    cover: string,
    photo_count: number,
    album_count: number
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
      photo_count={a.photo_count}
      album_count={a.album_count}
      lang={lang} />
  )

  return (
    <div>
      {album_array}
    </div>
  )
}