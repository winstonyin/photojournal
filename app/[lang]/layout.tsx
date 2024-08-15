import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"
import config from "@/site-config.json";
import Navbar from "./components/navbar";
import Logo from "./components/navbar/logo";
import NavItem from "./components/navbar/nav-item";
import ControlItem from "./components/navbar/control-item";
import ModalWrapper from "./components/modal/modal-wrapper";
import { PhotoIcon, NewspaperIcon, LanguageIcon, SunIcon } from "@heroicons/react/24/solid";

const inter = Inter({ subsets: ["latin"] });

// load custom site config
export const metadata: Metadata = {
  title: config.title,
  description: config.description
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/icon.png"
        type="image/png"
      />
      <body className={inter.className + "h-screen bg-gray-800 text-gray-100"}>
        <ModalWrapper>
          <Navbar>
            <Logo src={config.logo.src} alt={config.logo.alt} />
            <div>
              <ul>
                <NavItem href="/albums">
                  <PhotoIcon className="w-7 h-7" />
                </NavItem>
                <NavItem href="/posts">
                  <NewspaperIcon className="w-7 h-7" />
                </NavItem>
              </ul>
            </div>
            <div className="mt-auto">
              <ul>
                <ControlItem>
                  <LanguageIcon className="w-7 h-7" />
                </ControlItem>
                <ControlItem>
                  <SunIcon className="w-7 h-7" />
                </ControlItem>
              </ul>
            </div>
          </Navbar>
          <main className="ml-16 mt-auto h-screen">
            {children}
          </main>
        </ModalWrapper>
      </body>
    </html>
  )
}
