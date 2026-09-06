import { renderAppIcon } from '~/lib/app-icon';

import config from '~/app/config';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function Icon() {
  return renderAppIcon({
    ...size,
    textColor: config.theme.textColor,
    accentColor: config.theme.accentColor,
  });
}
