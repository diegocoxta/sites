import Image from 'next/image';

import styles from './styles.module.css';

interface AvatarProps {
  src: string;
  size: number;
  alt: string;
  animated?: boolean;
}

export default function Avatar(props: AvatarProps) {
  return (
    <Image
      src={props.src}
      className={`${styles.avatar} ${props.animated ? styles.animated : ''}`}
      width={props.size}
      height={props.size}
      alt={props.alt}
      loading="eager"
    />
  );
}
