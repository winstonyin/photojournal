import AlbumGallery from "@/app/[lang]/components/album-gallery";
import Breadcrumb from "@/app/[lang]/components/breadcrumb";
import PhotoGallery from "@/app/[lang]/components/photo-gallery";
import SlideshowSetter from "@/app/[lang]/components/modal/slideshow-setter";
import albums from "@/data/albums.json"
import config from "@/site-config.json"

export default function AlbumsPage({params}: {params: {lang: string, path?: string[]}}) {
  /*
  This is the main navigation for photo albums. The two main UI modes are
  album mode (for viewing a directory of directories only) and gallery mode
  (for viewing a directory of photos only)
  */
  const album_url = params.path ? "/albums/" + decodeURIComponent(params.path.join("/")) : "/albums"
  const album_data = albums.find(a => a.url == album_url)
  // extract only the chosen language
  // TODO: abstract away and consolidate with the posts page
  const photos = album_data?.photos?.map(
    (p: {src: string, desc: {[lang: string]: string}}) => (
      {src: p.src, desc: p.desc[params.lang]}
    )
  ) || []
  const subalbums = album_data?.subalbums?.map(
    (s: {url: string, title: {[lang: string]: string}, cover: string, photo_count: number, album_count: number}) => (
      {...s, title: s.title[params.lang]}
    )
  ) || []
  const breadcrumb = album_data?.breadcrumb.map(
    (b: {[lang: string]: string}) => b[params.lang]
  ) || []
  const title = (album_data?.title as {[lang: string]: string})[params.lang]
  const is_leaf = album_data?.is_leaf; // false for dir of dirs, true for dir of photos
  const gallery = is_leaf ? (
    <SlideshowSetter photos={photos}>
      <PhotoGallery
        photos={photos}
        start_key={0}
      />
    </SlideshowSetter>
  ) : (
    <AlbumGallery
      albums={subalbums}
      start_key={0}
      lang={params.lang}
    />
  )

  return (
    <div className="pt-3 pb-16 md:pb-5 flex flex-wrap">
      <Breadcrumb
        url={album_data?.url || ""}
        lang={params.lang}
        crumbs={breadcrumb}
        title={title} />
      {gallery}
    </div>
  )
}

export function generateStaticParams() {
  const album_paths = albums.map(a => a ? a.url.split("/").slice(2) : [])
  return album_paths.map(p => config.locales.map(l => ({lang: l, path: p}))).flat()
}