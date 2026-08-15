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

  url.pathname = `/${hostname}${url.pathname}`;

  return NextResponse.rewrite(url);
}
