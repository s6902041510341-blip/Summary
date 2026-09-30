import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import { SESSION_COOKIE } from '@/lib/mockStore'

const intlMiddleware = createIntlMiddleware(routing)

export async function middleware(request: NextRequest) {
  // 1. Handle i18n routing
  const intlResponse = intlMiddleware(request)

  const pathname = request.nextUrl.pathname
  const pathWithoutLocale = pathname.replace(/^\/(?:th|en)/, '') || '/'

  const isAuthRoute = pathWithoutLocale.startsWith('/login') || pathWithoutLocale.startsWith('/register')

  const locale = pathname.split('/')[1] || 'th'
  const safeLocale = ['th', 'en'].includes(locale) ? locale : 'th'

  // Check local session cookie
  const session = request.cookies.get(SESSION_COOKIE)?.value

  // If already logged in and visiting login/register, redirect to dashboard
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL(`/${safeLocale}/dashboard`, request.url))
  }

  return intlResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
