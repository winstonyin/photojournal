import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Photo Journal',
  description: 'Just your photo journal, no hassle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body className={inter.className + "h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"}>
        <Navbar />
        <main className="ml-20 h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
