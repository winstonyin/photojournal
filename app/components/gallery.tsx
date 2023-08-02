import Photo from "./photo";
// import albums from "@/data/albums.json"

export default function Gallery({children, start_key}: {children: React.ReactNode, start_key: string}) {
  // read the children line by line, each should be a path to an image /content/albums/...
  let src_array = children?.toString().split("\n").slice(0, -1) || []
  let photo_array = src_array.map((s, i) => {
    // query albums.json using the full path of image
    // let src_dir = "/" + s.split("/").slice(2, -1).join("/")
    // let album_entry = albums.find(a => a.url == src_dir)
    // let photo_entry = album_entry?.images?.find(im => im.src == s)
    // let key = i + props.start_key
    let key = i + parseInt(start_key)
    return <Photo key={key} src={s} url={"?photo=" + key} />
  })

  return (
    <div className="flex flex-wrap mt-8 mb-8">
      {photo_array}
    </div>
  )
}