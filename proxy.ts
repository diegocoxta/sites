import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  let hostname = request.headers.get('host') || '';

  hostname = hostname.split(':')[0];

  if (hostname === 'localhost') {
    hostname = process.env.DEV_SITE || 'diegocosta.com.br';
  }

  if (url.pathname.endsWith('.pdf')) {
    const pageSlug = url.pathname.replace('.pdf', '');

    url.pathname = `/${hostname}/api/pdf${pageSlug}`;

    return NextResponse.rewrite(url);
  }

  url.pathname = `/${hostname}${url.pathname}`;

  return NextResponse.rewrite(url);
}
