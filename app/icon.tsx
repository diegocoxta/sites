import { renderAppIcon } from '~/lib/app-image';

import config from '~/app/config';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function Icon() {
  return renderAppIcon({
    ...size,
    author: config.author,
    textColor: config.theme.textColor,
    accentColor: config.theme.accentColor,
  });
}
