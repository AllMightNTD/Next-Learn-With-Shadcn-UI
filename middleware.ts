import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const access_token = request.cookies.get('access_token')?.value;
  if(!access_token && !request.nextUrl.pathname.includes('login')){
    return NextResponse.redirect(new URL('/login', request.url))
  }else if(access_token && request.nextUrl.pathname.includes('login')){
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next();
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}