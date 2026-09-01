import { readFileSync } from 'fs';
import { join } from 'path';
import { ImageResponse } from 'next/og';

const fontPath = readFileSync(join(process.cwd(), 'public/fonts/SourceSans3-Bold.ttf'));

interface IconType {
  width: number;
  height: number;
  fontSize: number;
  accentColor: string;
  textColor: string;
}

export default async function SiteBrandingIcon(config: IconType) {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      background: 'transparent',
      color: config.textColor,
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
      color: config.accentColor,
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
