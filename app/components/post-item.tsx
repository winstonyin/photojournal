import Link from "next/link"

export default function PostItem(props: {
  href: string,
  title: string,
  date: string
}) {
  return (
    <Link href={props.href} className="block w-[800px] h-72 rounded-lg m-1 px-3 py-2 bg-gray-300 dark:bg-gray-700 hover:scale-[1.01] transition-transform">
      <h3 className="font-bold">{props.title}</h3>
      <p>date: {props.date}</p>
    </Link>
  )
}