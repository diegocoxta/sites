import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import type { SiteType } from '~/lib/config';
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, isSupportedLocale, negotiateLocale } from '~/lib/i18n';

import diegocoxtaCom from '~/app/diegocoxta.com/config';
import diegocostaComBr from '~/app/diegocosta.com.br/config';
import diegocostaMe from '~/app/diegocosta.me/config';

const SITES: readonly SiteType[] = [diegocostaComBr, diegocoxtaCom, diegocostaMe];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  let hostname = (request.headers.get('host') || '').split(':')[0];

  if (hostname === 'localhost') {
    hostname = process.env.DEV_SITE || SITES[0].domain;
  }

  let pathPrefix = '';
  let routePath = pathname;

  if (hostname.endsWith('.vercel.app')) {
    const [, maybeDomain, ...rest] = pathname.split('/');
    const matchedSite = SITES.find((site) => site.domain === maybeDomain);

    if (matchedSite) {
      hostname = matchedSite.domain;
      pathPrefix = `/${maybeDomain}`;
      routePath = `/${rest.join('/')}`;
    }
  }

  const site = SITES.find((s) => s.domain === hostname) ?? SITES[0];

  hostname = site.domain;

  const { locales } = site;

  const assetMetadata =
    /^\/(icon|apple-icon|opengraph-image|twitter-image|robots\.txt|manifest\.json|sitemap\.xml)(\/|$)|\.[^/]+$/;

  const onlyOneLanguageOrAssetMetadata = locales.length < 2 || assetMetadata.test(routePath);

  if (onlyOneLanguageOrAssetMetadata) {
    url.pathname = `/${hostname}${routePath}`;

    return NextResponse.rewrite(url);
  }

  const firstSegment = routePath.split('/')[1];
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;

  const withoutLanguagePrefix = !isSupportedLocale(locales, firstSegment);

  if (withoutLanguagePrefix) {
    const locale = negotiateLocale(locales, cookie, request.headers.get('accept-language'));

    url.pathname = `${pathPrefix}/${locale}${routePath === '/' ? '' : routePath}`;

    return NextResponse.redirect(url);
  }

  url.pathname = `/${hostname}${routePath}`;

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
