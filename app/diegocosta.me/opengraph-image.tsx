import { readFileSync } from 'fs';
import { join } from 'path';
import { ImageResponse } from 'next/og';

import { getTranslations } from '~/lib/i18n/messages';

import config from '~/app/diegocosta.me/config';

const fontPath = readFileSync(join(process.cwd(), 'public/fonts/SourceSans3-Bold.ttf'));

export const alt = 'Diego Costa';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// One generic, site-wide card (not one render per photo) — every page falls back to
// this unless it defines its own opengraph-image, and none currently do.
export default async function Image() {
  const t = getTranslations(config);
  const [firstName, lastName] = config.author.split(' ');

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        backgroundColor: '#201e1d',
      }}
    >
      <div style={{ display: 'flex', fontSize: 110, color: '#faf7f6' }}>
        <span style={{ display: 'flex' }}>{firstName.toLowerCase()}</span>
        {lastName && <span style={{ display: 'flex', color: '#ec3013' }}>{lastName[0].toLowerCase()}.</span>}
      </div>
      <div style={{ display: 'flex', fontSize: 32, color: '#a8a3a2' }}>{t(config.description)}</div>
      <div style={{ display: 'flex', fontSize: 24, color: '#ec3013' }}>{config.domain}</div>
    </div>,
    {
      ...size,
      fonts: [{ name: 'Source Sans 3', data: fontPath, style: 'normal', weight: 700 }],
    }
  );
}
