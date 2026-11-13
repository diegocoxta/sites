import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

import { NextResponse } from 'next/server';

import config from '~/app/diegocoxta.com/config';
import { publicPath } from '~/lib/domain';

export const revalidate = false;

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Cross-Origin-Resource-Policy': 'cross-origin',
  'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
};

export const GET = async () => {
  const { avatar, domain } = config;

  if (!avatar) {
    return new NextResponse(null, { status: 404 });
  }

  const file = await readFile(publicPath(domain, avatar));

  return new NextResponse(file, {
    headers: {
      ...HEADERS,
      'Content-Type': CONTENT_TYPES[extname(avatar).toLowerCase()] ?? 'application/octet-stream',
    },
  });
};

export const OPTIONS = () =>
  new NextResponse(null, {
    status: 204,
    headers: { ...HEADERS, 'Access-Control-Allow-Methods': 'GET, OPTIONS' },
  });
