import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import site_config from "./site-config.json";

function getLocale(request: NextRequest) {
  const accept_language = request.headers.get("accept-language") || ""
  const languages = new Negotiator({headers: {"accept-language": accept_language}}).languages()
  const default_locale = site_config.locales[0] || "en"
  return match(languages, site_config.locales, default_locale)
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = site_config.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next) and images (img) and icon.png
    '/((?!_next|img|icon\.png).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}