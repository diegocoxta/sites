'use client';

import { useTranslator } from '~/components/TranslationProvider';

import styles from './styles.module.css';

interface LoadMoreProps {
  loading: boolean;
  failed: boolean;
  onLoadMore: () => void;
  /** Observed by the parent's IntersectionObserver to auto-load before the button scrolls into view. */
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

export default function LoadMore({ loading, failed, onLoadMore, sentinelRef }: LoadMoreProps) {
  const t = useTranslator();

  return (
    <div className={styles.more}>
      <button className={styles.button} type="button" onClick={onLoadMore} disabled={loading}>
        {loading
          ? t('client.components.photoshowcase.loadmore.loading')
          : failed
            ? t('client.components.photoshowcase.loadmore.retry')
            : t('client.components.photoshowcase.loadmore.label')}
      </button>
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden />
    </div>
  );
}
