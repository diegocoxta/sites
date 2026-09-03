import { notFound } from 'next/navigation';

import { contentFor } from '~/lib/content';

import config from '~/app/diegocosta.me/config';

const content = contentFor(config);

interface PageProps {
  params: Promise<{ page: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;
  const doc = content.readFile(`/pages/${page[0]}`, page[1] || config.locales[0]);

  if (!doc) {
    notFound();
  }

  return null;
}
