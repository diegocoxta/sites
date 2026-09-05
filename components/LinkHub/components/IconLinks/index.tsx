import * as Fa6 from 'react-icons/fa6';

import type { ComponentWithTranslator } from '~/lib/i18n';
import type { IconLinkType } from '~/lib/config';

import styles from './styles.module.css';

export type IconLinksProps = ComponentWithTranslator<{
  icons: IconLinkType[];
}>;

const faIcon = (name?: string) => (name ? Fa6[name as keyof typeof Fa6] : undefined);

export default function IconLinks({ t, icons }: IconLinksProps) {
  return (
    <nav>
      <ul className={styles.list}>
        {icons.map((icon) => {
          const Icon = faIcon(icon.icon);
          const label = t(icon.title);

          return (
            <li key={icon.href}>
              <a
                href={icon.href}
                title={label}
                aria-label={label}
                target="_blank"
                rel="me noopener"
                className={styles.item}
              >
                {Icon && <Icon />}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
