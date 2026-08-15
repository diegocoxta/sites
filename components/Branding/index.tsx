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
    <Link className={styles.link} href={href} data-testid="logo-link">
      <h1 className={styles.name} style={{ fontSize: size }}>
        {firstName}
        {lastName && (
          <span className={styles.lastName} data-testid="logo-lastname">
            {lastName[0]}
            <span className={styles.lastNameHidden}>{lastName.slice(1)}</span>.
          </span>
        )}
      </h1>
    </Link>
  );
}
