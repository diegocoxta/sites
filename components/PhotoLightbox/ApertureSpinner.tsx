import styles from './styles.module.css';

// One iris blade, repeated 6× (rotated 60° apart) below. Alternating opacity gives the
// two-tone pinwheel look of a camera aperture without needing a second brand color.
const APERTURE_BLADE_PATH = 'M63.8,47.6 94,50 A44,44 0 0 1 61.4,92.5 L59,60.7 A14,14 0 0 0 63.8,47.6Z';

export default function ApertureSpinner(): React.ReactElement {
  return (
    <svg className={styles.spinner} viewBox="0 0 100 100" aria-hidden focusable="false">
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={APERTURE_BLADE_PATH} opacity={i % 2 === 0 ? 1 : 0.55} transform={`rotate(${i * 60} 50 50)`} />
      ))}
    </svg>
  );
}
