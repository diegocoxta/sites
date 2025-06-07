'use client';

import { KBarAnimator, KBarPortal, useMatches, KBarPositioner, KBarSearch, KBarResults, useKBar } from 'kbar';
import { BsCommand, BsSearch } from 'react-icons/bs';

import styles from './styles.module.css';

export default function CommandBar(): React.ReactElement {
  const { query } = useKBar();
  const { results } = useMatches();

  return (
    <>
      <button className={styles.button} onClick={() => query.toggle()}>
        <BsCommand size={28} />
      </button>
      <KBarPortal>
        <KBarPositioner className={styles.positioner}>
          <KBarAnimator className={styles.animator}>
            <div className={styles.item}>
              <BsSearch />
              <KBarSearch className={styles.search} defaultPlaceholder="Type a command or search…" />
              <div className={styles.shortcut} aria-hidden>
                <kbd className={styles.shortcutIcon}>esc</kbd>
              </div>
            </div>
            <KBarResults
              items={results}
              onRender={({ item, active }) => {
                if (typeof item === 'string') {
                  return <div className={styles.groupName}>{item}</div>;
                }

                return (
                  <div className={styles.item} data-active={active}>
                    <div className={styles.label}>
                      {item.icon}
                      {item.name}
                    </div>

                    {item.shortcut && (
                      <div className={styles.shortcut} aria-hidden>
                        {item.shortcut.map((shortcut: string) => (
                          <kbd className={styles.shortcutIcon} key={shortcut}>
                            {shortcut}
                          </kbd>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }}
            />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </>
  );
}
