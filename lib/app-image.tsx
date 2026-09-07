import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

const brandFont = {
  name: 'Source Sans 3',
  data: readFileSync(join(process.cwd(), 'public/fonts/SourceSans3-Bold.ttf')),
  style: 'normal' as const,
  weight: 700 as const,
};

interface AppIconProps {
  name: string;
  color: string;
  accentColor: string;
  fontSize: number;
}

function AppIcon({ name, color, accentColor, fontSize }: AppIconProps) {
  const [first, last] = name.split(' ');
  const lead = (first?.[0] ?? '').toLowerCase();
  const tail = last ? `${last[0].toLowerCase()}.` : '.';

  return (
    <div style={{ display: 'flex', color, fontSize }}>
      {lead}
      <div style={{ color: accentColor }}>{tail}</div>
    </div>
  );
}

interface AppIconConfig {
  width: number;
  height: number;
  accentColor: string;
  textColor: string;
  author: string;
}

export async function renderAppIcon(config: AppIconConfig) {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      background: 'transparent',
      display: 'flex',
      width: '100%',
      height: '100%',
      flexDirection: 'column',
    },
    center: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return new ImageResponse(
    <div style={styles.container}>
      <div style={styles.center}>
        <AppIcon
          name={config.author}
          color={config.textColor}
          accentColor={config.accentColor}
          fontSize={config.width / 1.5}
        />
      </div>
    </div>,
    {
      width: config.width,
      height: config.height,
      fonts: [brandFont],
    }
  );
}

interface OgImageConfig {
  author: string;
  title: string;
  meta: string;
  accentColor: string;
}

export function renderOgImage(config: OgImageConfig) {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 80,
      background: config.accentColor,
      color: '#fff',
      fontFamily: 'Source Sans 3',
    },
    title: { fontSize: 68, lineHeight: 1.15, fontWeight: 700, display: 'flex' },
    meta: { fontSize: 30, opacity: 0.85 },
  };

  return new ImageResponse(
    <div style={styles.container}>
      <AppIcon name={config.author} color="#fff" accentColor="rgba(255, 255, 255, 0.55)" fontSize={65} />
      <div style={styles.title}>{config.title}</div>
      <div style={styles.meta}>{config.meta}</div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [brandFont],
    }
  );
}
