import Link from 'next/link';

import type { ComponentWithTranslator } from '~/lib/i18n/translator';

import styles from './styles.module.css';

type LanguageSwitcherProps = ComponentWithTranslator<{
  locales: readonly string[];
  path: string;
}>;

export default function LanguageSwitcher({ t, locales, path }: LanguageSwitcherProps) {
  return (
    <nav aria-label={t('components.languageswitcher.label')}>
      <ul className={styles.list}>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              className={styles.link}
              href={`/${locale}${path}`}
              lang={locale}
              hrefLang={locale}
              aria-current={locale === t.locale ? 'true' : undefined}
              title={new Intl.DisplayNames([locale], { type: 'language' }).of(locale)}
            >
              {locale}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
