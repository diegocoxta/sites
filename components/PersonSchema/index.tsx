import { Person, WithContext } from 'schema-dts';

import type { ConfigType } from '~/lib/config';

interface PersonSchemaProps {
  data: ConfigType;
}

export default function PersonSchema({ data }: PersonSchemaProps) {
  const jsonLd: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.author,
    image: data.avatar && (data.avatar?.startsWith('http') ? data.avatar : `https://${data.domain}${data.avatar}`),
    url: `https://${data.domain}`,
    email: data.links?.find((link) => link.href.startsWith('mailto:'))?.href.replace('mailto:', ''),
    jobTitle: data.jobTitle,
    sameAs: data.links?.filter((link) => link.href.startsWith('http')).map((link) => link.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  );
}
