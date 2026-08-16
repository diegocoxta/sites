import Link from 'next/link';

import styles from './styles.module.css';

export interface BrandingProps {
  name: string;
  href?: string;
  size?: number;
}

export default function Branding(props: BrandingProps) {
  const { name, href = '/', size } = props;
  const [firstName, lastName] = name.split(' ');

  return (
    <h1 className={styles.name} style={{ fontSize: size }}>
      <Link className={styles.link} href={href} data-testid="logo-link">
        {firstName}
        {lastName && (
          <span className={styles.lastName} data-testid="logo-lastname">
            {lastName[0]}
            <span className={styles.lastNameHidden}>{lastName.slice(1)}</span>.
          </span>
        )}
      </Link>
    </h1>
  );
}
