import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  if (hostname.startsWith('gtm.sbsnexus')) {
    return NextResponse.redirect(
      'https://sbs-automation.streamlit.app' + request.nextUrl.pathname,
      { status: 301 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
