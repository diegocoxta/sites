import Link from 'next/link';

import Avatar from '~/components/Avatar';

import styles from './styles.module.css';

export interface HeaderProps {
  name: string;
  href?: string;
  size?: number;
  avatar?: string;
}

export default function Header({
  href = '/',
  name,
  size = 70,
  children,
  avatar,
}: React.PropsWithChildren<HeaderProps>): React.ReactElement {
  const [firstName, lastName] = name.split(' ');
  const isHandler = firstName.startsWith('@');

  return (
    <header className={styles.container}>
      <Link className={styles.link} href={href} data-testid="logo-link">
        {avatar && <Avatar src={avatar} size={size} alt={name} />}
        <h1 className={styles.name} style={{ fontSize: size }}>
          {!isHandler ? (
            firstName
          ) : (
            <>
              <span className={styles.lastName}>@</span>
              {firstName.slice(1)}
            </>
          )}
          {lastName && (
            <span className={styles.lastName} data-testid="logo-lastname">
              {lastName[0]}.
            </span>
          )}
        </h1>
      </Link>
      <div className={styles.navBar}>{children}</div>
    </header>
  );
}
