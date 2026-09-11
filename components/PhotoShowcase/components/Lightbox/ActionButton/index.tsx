'use client';

import Link from 'next/link';

import styles from './styles.module.css';

interface LightboxActionButtonProps {
  className: string;
  ariaLabel: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function LightboxActionButton(props: LightboxActionButtonProps) {
  const classes = `${styles.action} ${props.className} ${props.disabled ? styles.disabled : ''}`;

  if (props.disabled) {
    return (
      <span className={classes} aria-hidden>
        {props.children}
      </span>
    );
  }

  if (props.href) {
    return (
      <Link className={classes} href={props.href} replace scroll={false} aria-label={props.ariaLabel}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" onClick={props.onClick} aria-label={props.ariaLabel}>
      {props.children}
    </button>
  );
}
