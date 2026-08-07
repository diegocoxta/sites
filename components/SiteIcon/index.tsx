import { readFileSync } from 'fs';
import { join } from 'path';
import { ImageResponse } from 'next/og';

import { SITE_ACCENT_COLOR, SITE_TEXT_COLOR } from '~/lib/consts';

export type ScreenSizesType = {
  logicalWidth: number;
  logicalHeight: number;
  pixelRatio: number;
  name?: string;
};

export const screensSizes: ScreenSizesType[] = [
  // --- iPhones ---
  { logicalWidth: 430, logicalHeight: 932, pixelRatio: 3, name: 'iPhone 15 Pro Max / 14 Pro Max' },
  { logicalWidth: 393, logicalHeight: 852, pixelRatio: 3, name: 'iPhone 15 Pro / 15 / 14 Pro' },
  { logicalWidth: 428, logicalHeight: 926, pixelRatio: 3, name: 'iPhone 14 Plus / 13 Pro Max / 12 Pro Max' },
  { logicalWidth: 390, logicalHeight: 844, pixelRatio: 3, name: 'iPhone 14 / 13 Pro / 13 / 12 Pro / 12' },
  { logicalWidth: 375, logicalHeight: 812, pixelRatio: 3, name: 'iPhone 13 mini / 12 mini / 11 Pro / XS / X' },
  { logicalWidth: 414, logicalHeight: 896, pixelRatio: 3, name: 'iPhone 11 Pro Max / XS Max' },
  { logicalWidth: 414, logicalHeight: 896, pixelRatio: 2, name: 'iPhone 11 / XR' },
  { logicalWidth: 414, logicalHeight: 736, pixelRatio: 3, name: 'iPhone 8 Plus / 7 Plus / 6s Plus' },
  { logicalWidth: 375, logicalHeight: 667, pixelRatio: 2, name: 'iPhone SE / 8 / 7 / 6s' },

  // --- iPads ---
  { logicalWidth: 1024, logicalHeight: 1366, pixelRatio: 2, name: 'iPad Pro 12.9"' },
  { logicalWidth: 834, logicalHeight: 1194, pixelRatio: 2, name: 'iPad Pro 11" / iPad Air' },
  { logicalWidth: 820, logicalHeight: 1180, pixelRatio: 2, name: 'iPad (10th gen)' },
  { logicalWidth: 834, logicalHeight: 1112, pixelRatio: 2, name: 'iPad Pro 10.5" / iPad Air / iPad' },
  { logicalWidth: 744, logicalHeight: 1133, pixelRatio: 2, name: 'iPad mini (6th gen)' },
  { logicalWidth: 768, logicalHeight: 1024, pixelRatio: 2, name: 'iPad mini / iPad Air 2 / iPad' },
];

const fontPath = readFileSync(join(process.cwd(), 'public/fonts/SourceSans3-Bold.ttf'));

export interface IconType {
  width: number;
  height: number;
  fontSize: number;
}

export default async function SiteIcon(config: IconType) {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      background: 'transparent',
      color: SITE_TEXT_COLOR,
      display: 'flex',
      width: '100%',
      height: '100%',
      flexDirection: 'column',
    },
    name: {
      fontSize: config.width / 1.5,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      height: '100%',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    lastName: {
      color: SITE_ACCENT_COLOR,
    },
  };

  return new ImageResponse(
    <div style={styles.container}>
      <div style={styles.name}>
        d<div style={styles.lastName}>c.</div>
      </div>
    </div>,
    {
      width: config.width,
      height: config.height,
      fonts: [
        {
          name: 'Source Sans 3',
          data: fontPath,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
