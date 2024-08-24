import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import site_config from "./site-config.json";

function getLocale(request: NextRequest) {
  const accept_language = request.headers.get("accept-language") || ""
  const cookie_language = request.cookies.get("custom_locale")?.value // TODO: doesn't work...
  const languages = new Negotiator({headers: {"accept-language": cookie_language || accept_language}}).languages()
  const default_locale = site_config.locales[0] || "en"
  return match(languages, site_config.locales, default_locale)
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const path_locale = site_config.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (path_locale) {
    if (pathname == `/${path_locale}`) {
      request.nextUrl.pathname = `/${path_locale}/albums`
      return NextResponse.redirect(request.nextUrl)
    }
    // response = NextResponse.next()
    // TODO: so this straight-up doesn't work
    // response.cookies.set("custom_locale", path_locale) // TODO: not really sure when this is called (server/client?)
  } else {
    // Redirect if there is no locale
    const locale = getLocale(request)
    request.nextUrl.pathname = pathname ? `/${locale}${pathname}` : `/${locale}/albums`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl)
  }
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next) and images (img, content) and icon.png
    '/((?!_next|img|content|icon\.png).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}