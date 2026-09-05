import Link from 'next/link';

import styles from './styles.module.css';

interface LogoProps {
  name: string;
  size?: number;
}

export default function Logo({ name, size }: LogoProps) {
  const isHandle = name.startsWith('@') && !name.includes(' ');
  const [firstName, lastName] = name.split(' ');

  return (
    <h1 className={styles.name} style={{ fontSize: size ? `${size}px` : undefined }}>
      <Link className={styles.link} href="/">
        {isHandle ? (
          <>
            <span className={styles.handle}>@</span>
            <span>{name.slice(1)}</span>
          </>
        ) : lastName ? (
          <>
            {firstName}
            <span className={styles.lastName}>
              {lastName[0]}
              <span className={styles.lastNameHidden}>{lastName.slice(1)}</span>.
            </span>
          </>
        ) : (
          name
        )}
      </Link>
    </h1>
  );
}
