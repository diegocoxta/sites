import Link from 'next/link';

import styles from './styles.module.css';

interface BrandingProps {
  name: string;
  size?: number;
}

export default function Branding(props: BrandingProps) {
  const { name, size } = props;
  const [firstName, lastName] = name.split(' ');

  return (
    <h1 className={styles.name} style={{ fontSize: `${size}px` }}>
      <Link className={styles.link} href="/">
        {firstName}
        {lastName && (
          <span className={styles.lastName}>
            {lastName[0]}
            <span className={styles.lastNameHidden}>{lastName.slice(1)}</span>.
          </span>
        )}
      </Link>
    </h1>
  );
}
