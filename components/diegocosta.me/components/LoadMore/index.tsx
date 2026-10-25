'use client';

import { useTranslator } from '~/components/shared/TranslationProvider';

import styles from './styles.module.css';

interface LoadMoreProps {
  loading: boolean;
  failed: boolean;
  onLoadMore: () => void;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

export default function LoadMore({ loading, failed, onLoadMore, sentinelRef }: LoadMoreProps) {
  const t = useTranslator();

  return (
    <div className={styles.more}>
      <button className={styles.button} type="button" onClick={onLoadMore} disabled={loading}>
        {loading
          ? t('components.loadmore.loading')
          : failed
            ? t('components.loadmore.retry')
            : t('components.loadmore.label')}
      </button>
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden />
    </div>
  );
}
