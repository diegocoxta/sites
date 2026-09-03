import { notFound } from 'next/navigation';

import { contentFor } from '~/lib/content';

import config from '~/app/diegocoxta.com/config';

const content = contentFor(config);

interface PageProps {
  params: Promise<{ page: string[]; locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const { page, locale } = await params;

  const doc = content.readFile(`/pages/${page[0]}`, locale);

  if (!doc) {
    notFound();
  }

  return null;
}
