import { icon } from '~/lib/icon';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function Icon() {
  const response = await icon({
    ...size,
    fontSize: 60,
  });

  return response;
}
