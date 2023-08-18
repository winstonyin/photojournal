import Link from "next/link"

export default function LargePhoto({children, url}: {children: React.ReactNode, url: string}) {
    return (
      <Link href={url} className="inline-block w-80 h-80 rounded-lg m-1 hover:scale-[1.02] transition-transform">
        <div className="relative w-80 h-80 overflow-hidden rounded-lg justify-center align-middle">
          {children}
        </div>
      </Link>
    )
}