import type { RecentActivityType } from '~/lib/config';
import type { ComponentWithTranslator } from '~/lib/i18n';

import styles from './styles.module.css';

export type RecentActivityWidgetProps = ComponentWithTranslator<Pick<RecentActivityType, 'config'>>;

type RecentActivityProps = React.PropsWithChildren<{
  title?: string;
  layout?: 'grid' | 'list' | 'plain';
  gridColumns?: number;
}>;

export default function RecentActivity(props: RecentActivityProps) {
  const { title, layout = 'plain', gridColumns, children } = props;
  const heading = title ? <h4 className={styles.title}>{title}</h4> : null;

  if (layout === 'plain') {
    return (
      <>
        {heading}
        {children}
      </>
    );
  }

  const style =
    layout === 'grid' && gridColumns
      ? { display: 'grid', gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }
      : undefined;

  return (
    <>
      {heading}
      <ul className={styles[layout]} style={style}>
        {children}
      </ul>
    </>
  );
}

type RecentActivityItemProps = React.LiHTMLAttributes<HTMLLIElement>;

RecentActivity.Item = function Item({ className, children, ...props }: RecentActivityItemProps) {
  return (
    <li className={className ? `${styles.item} ${className}` : styles.item} {...props}>
      {children}
    </li>
  );
};
