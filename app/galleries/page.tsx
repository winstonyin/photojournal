import GalleryItem from "../components/gallery-item"

export default function Galleries() {
  return (
    <div className="p-3 flex flex-wrap">
      <GalleryItem src="/lake_serene.jpg" title="Lake Serene" n_photos={48}/>
      <GalleryItem src="/smith_rock.jpg" title="Smith Rock" n_photos={33}/>
      <GalleryItem src="/campanile.jpg" title="Campanile" n_photos={12}/>
      <GalleryItem src="/lake_serene.jpg" title="Lake Serene" n_photos={48}/>
      <GalleryItem src="/smith_rock.jpg" title="Smith Rock" n_photos={33}/>
      <GalleryItem src="/campanile.jpg" title="Campanile" n_photos={12}/>
    </div>
  )
}