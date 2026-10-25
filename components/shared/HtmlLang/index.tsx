'use client';

import { useEffect } from 'react';

export default function HtmlLang({ locale }: { locale: string }) {
  // The inline script sets the lang before hydration; the effect keeps it right on client-side locale changes.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(locale)}`,
      }}
    />
  );
}
