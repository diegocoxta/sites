import { Fragment } from 'react';
import Link from 'next/link';
import { RiArrowRightDoubleFill } from 'react-icons/ri';

import styles from './styles.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <h1 className={styles.title}>
      {items.map((item, index) => (
        <Fragment key={`breadcrumb-${index}`}>
          {index > 0 && <RiArrowRightDoubleFill />}
          {item.href ? (
            <Link className={styles.link} href={item.href}>
              {item.label}
            </Link>
          ) : (
            item.label
          )}
        </Fragment>
      ))}
    </h1>
  );
}
