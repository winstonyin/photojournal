import Link from "next/link";
import Image from "next/image";

export default function GalleryItem(props: {
  src: string,
  title: string,
  n_photos: number
}) {
  return (
    <div className="inline-block w-80 h-96 rounded-lg m-1 bg-gray-300 dark:bg-gray-700">
      <div className="block relative w-full h-80 overflow-hidden rounded-t-lg flex justify-center align-center">
        <Image
          src={props.src}
          alt={"Gallery - " + props.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="block w-full h-16 overflow-hidden text-ellipsis px-3 py-2">
        <h3>{props.title}</h3>
        <p>{props.n_photos} photos</p>
      </div>
    </div>
  )
}