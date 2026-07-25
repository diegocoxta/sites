import Link from 'next/link';

import styles from './styles.module.css';

export interface HeaderProps {
  name: string;
  href?: string;
}

export default function Header({
  href = '/',
  name,
  children,
}: React.PropsWithChildren<HeaderProps>): React.ReactElement {
  const [firstName, lastName] = name.split(' ');

  return (
    <header className={styles.container}>
      <Link className={styles.link} href={href} data-testid="logo-link">
        <h1 className={styles.name}>
          {firstName}
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
