import SiteBrandingIcon from '~/components/SiteBrandingIcon';

import config from '~/app/config';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function Icon() {
  const response = await SiteBrandingIcon({
    ...size,
    fontSize: 60,
    textColor: config.theme.textColor,
    accentColor: config.theme.accentColor,
  });

  return response;
}
