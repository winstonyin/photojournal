import Link from "next/link";
import Image from "next/image";

export default function GalleryItem(props: {
  src: string,
  url: string,
  title: string,
  n_photos: number
}) {
  return (
    <Link href={props.url}>
      <div className="inline-block w-80 h-96 rounded-lg m-1 bg-gray-300 dark:bg-gray-700 hover:scale-[1.02] transition-transform">
        <div className="relative w-full h-80 overflow-hidden rounded-t-lg justify-center align-center">
          <Image
            src={props.src}
            alt={"Gallery - " + props.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="block w-full h-16 overflow-hidden text-ellipsis px-3 py-2">
          <h3 className="font-bold">{props.title}</h3>
          <p className="text-gray-700 dark:text-gray-300">{props.n_photos} photos</p>
        </div>
      </div>
    </Link>
  )
}