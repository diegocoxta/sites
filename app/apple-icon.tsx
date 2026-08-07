import SiteIcon from '~/components/SiteIcon';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function Icon() {
  const response = await SiteIcon({
    ...size,
    fontSize: 60,
  });

  return response;
}
