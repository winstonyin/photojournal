import Link from "next/link";
import Image from "next/image";

export default function Photo(props: {
  src: string,
  url: string,
}) {
  return (
    <Link href="/photo">
      <div className="relative inline-block overflow-visible hover:overflow-visible w-48 h-48 m-0.5 bg-gray-500 justify-center align-center hover:scale-[1.02] transition-transform">
        <Image
          src={props.src}
          alt="photo"
          fill
          className="object-cover"
        />
      </div>
    </Link>
  )
}