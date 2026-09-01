import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import type { SiteType } from '~/lib/config';
import { LOCALES, LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, isSupportedLocale, negotiateLocale } from '~/lib/i18n';

import diegocoxtaCom from '~/app/diegocoxta.com/config';
import diegocostaComBr from '~/app/diegocosta.com.br/config';
import diegocostaMe from '~/app/diegocosta.me/config';

const SITES: readonly SiteType[] = [diegocoxtaCom, diegocostaComBr, diegocostaMe];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  let hostname = (request.headers.get('host') || '').split(':')[0];

  if (hostname === 'localhost') {
    hostname = process.env.DEV_SITE || 'diegocosta.com.br';
  }

  const locales = SITES.find((site) => site.domain === hostname)?.locales ?? [LOCALES[0]];

  const assetMetadata =
    /^\/(icon|apple-icon|opengraph-image|twitter-image|robots\.txt|manifest\.json|sitemap\.xml)(\/|$)|\.[^/]+$/;

  const onlyOneLanguageOrAssetMetadata = locales.length < 2 || assetMetadata.test(pathname);

  if (onlyOneLanguageOrAssetMetadata) {
    url.pathname = `/${hostname}${pathname}`;

    return NextResponse.rewrite(url);
  }

  const firstSegment = pathname.split('/')[1];
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;

  const withoutLanguagePrefix = !isSupportedLocale(locales, firstSegment);

  if (withoutLanguagePrefix) {
    const locale = negotiateLocale(locales, cookie, request.headers.get('accept-language'));

    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

    return NextResponse.redirect(url);
  }

  url.pathname = `/${hostname}${pathname}`;

  const response = NextResponse.rewrite(url);

  if (cookie !== firstSegment) {
    response.cookies.set(LOCALE_COOKIE, firstSegment, {
      path: '/',
      maxAge: LOCALE_COOKIE_MAX_AGE,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
