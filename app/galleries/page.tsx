import GalleryItem from "../components/gallery-item"

export default function Galleries() {
  return (
    <div className="p-3 flex flex-wrap">
      <GalleryItem src="/lake_serene.jpg" url="/galleries/lake-serene" title="Lake Serene" n_photos={48}/>
      <GalleryItem src="/smith_rock.jpg" url="/galleries/lake-serene" title="Smith Rock" n_photos={33}/>
      <GalleryItem src="/campanile.jpg" url="/galleries/lake-serene" title="Campanile" n_photos={12}/>
      <GalleryItem src="/lake_serene.jpg" url="/galleries/lake-serene" title="Lake Serene" n_photos={48}/>
      <GalleryItem src="/smith_rock.jpg" url="/galleries/lake-serene" title="Smith Rock" n_photos={33}/>
      <GalleryItem src="/campanile.jpg" url="/galleries/lake-serene" title="Campanile" n_photos={12}/>
    </div>
  )
}