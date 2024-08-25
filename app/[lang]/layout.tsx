import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"
import config from "@/site-config.json";
import Navbar from "./components/navbar";
import Logo from "./components/navbar/logo";
import NavItem from "./components/navbar/nav-item";
import ControlItem from "./components/navbar/control-item";
import LanguageSwitcher from "./components/navbar/language-switcher";
import ModalWrapper from "./components/modal/modal-wrapper";
import LanguageWrapper from "./components/language-wrapper";
import { PhotoIcon, NewspaperIcon, LanguageIcon, SunIcon } from "@heroicons/react/24/solid";

const inter = Inter({ subsets: ["latin"] });

// load custom site config
export const metadata: Metadata = {
  title: config.title,
  description: config.description,
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
}

// TODO: Move Navbar to the navbar file?
export default function RootLayout({params, children}: {params: {lang: string}, children: React.ReactNode}) {
  return (
    <html lang={params.lang}>
      <link
        rel="icon"
        href="/icon.png"
        type="image/png"
      />
      <body className={inter.className + "h-full bg-gray-800 text-gray-100"}>
        <LanguageWrapper>
          <ModalWrapper>
            <Navbar>
              <Logo src={config.logo.src} alt={config.logo.alt} lang={params.lang} />
              <div>
                <ul>
                  <NavItem href={"/" + params.lang + "/albums"}>
                    <PhotoIcon className="w-6 h-6 md:w-7 md:h-7" />
                  </NavItem>
                  <NavItem href={"/" + params.lang + "/posts"}>
                    <NewspaperIcon className="w-6 h-6 md:w-7 md:h-7" />
                  </NavItem>
                </ul>
              </div>
              <div className="ml-auto md:mt-auto">
                <ul>
                  <LanguageSwitcher>
                    <LanguageIcon className="w-6 h-6 md:w-7 md:h-7" />
                  </LanguageSwitcher>
                  {/* <ControlItem>
                    <SunIcon className="w-7 h-7" />
                  </ControlItem> */}
                </ul>
              </div>
            </Navbar>
            <main className="mx-3 mt-auto h-screen md:ml-16">
              {children}
            </main>
          </ModalWrapper>
        </LanguageWrapper>
      </body>
    </html>
  )
}
