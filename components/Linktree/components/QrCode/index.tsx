import Image from 'next/image';

import type { ComponentWithTranslator } from '~/lib/i18n';

import styles from './styles.module.css';

export type QrCodeProps = ComponentWithTranslator;

export default function QrCode({ t }: QrCodeProps) {
  return (
    <div className={styles.qrCode}>
      <Image src="/qr-code.png" alt="QR Code" width={150} height={150} className={styles.qrCodeImage} unoptimized />
      <p className={styles.qrCodeDescription}>{t('components.linktree.qrHint')}</p>
    </div>
  );
}
