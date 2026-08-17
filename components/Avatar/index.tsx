import Image from 'next/image';

import styles from './styles.module.css';

interface AvatarProps {
  src: string;
  size: number;
  alt: string;
  animated?: boolean;
}

export default function Avatar(props: AvatarProps) {
  const { src, size, alt, animated } = props;

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <Image
        src={src}
        className={`${styles.avatar} ${animated ? styles.animated : ''}`}
        width={size}
        height={size}
        alt={alt}
      />
    </div>
  );
}
