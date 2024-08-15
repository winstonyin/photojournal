import AlbumGallery from "@/app/components/album-gallery";
import Breadcrumb from "@/app/components/breadcrumb";
import PhotoGallery from "@/app/components/photo-gallery";
import SlideshowSetter from "@/app/components/slideshow-setter";
import albums from "@/data/albums.json"

export default function AlbumsPage({params}: {params: {path?: string[]}}) {
  /*
  This is the main navigation for photo albums. The two main UI modes are
  album mode (for viewing a directory of directories only) and gallery mode
  (for viewing a directory of photos only)
  */
  const album_url = params.path ? "/albums/" + decodeURIComponent(params.path.join("/")) : "/albums"
  const album_data = albums.find(a => a.url == album_url)
  const is_leaf = album_data?.is_leaf; // false for dir of dirs, true for dir of photos
  const gallery = is_leaf ? (
    <SlideshowSetter photos={album_data?.photos || []}>
      <PhotoGallery
        photos={album_data?.photos || []}
        start_key={0}
      />
    </SlideshowSetter>
  ) : (
    <AlbumGallery
      albums={album_data?.subalbums || []}
      start_key={0}
    />
  )

  return (
    <div className="pt-3 flex flex-wrap">
      <Breadcrumb
        url={album_data?.url || ""}
        crumbs={album_data?.breadcrumb || []}
        title={album_data?.title || ""} />
      {gallery}
    </div>
  )
}

export function generateStaticParams() {
  const album_paths = albums.map(a => a ? a.url.split("/").slice(2) : [])
  return album_paths.map(p => ({path: p}))
}