import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Public routes that don't need authentication
  const publicRoutes = ['/', '/login', '/register']
  
  // Check if current path is public
  const isPublicRoute = publicRoutes.includes(pathname)
  
  // Get auth token from cookie
  const isAuthenticated = request.cookies.has('auth-token')
  
  // If trying to access protected route without auth, redirect to login
  if (!isPublicRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // If authenticated and trying to access login/register, redirect to dashboard
  if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Add security headers
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}