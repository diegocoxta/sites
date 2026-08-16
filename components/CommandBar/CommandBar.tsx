'use client';

import React from 'react';
import { KBarAnimator, KBarPortal, useMatches, KBarPositioner, KBarSearch, KBarResults, useKBar } from 'kbar';
import { LuCommand, LuSearch } from 'react-icons/lu';

import type { ExtendedAction } from './index';

import styles from './styles.module.css';

export default function CommandBar(): React.ReactElement {
  const { query } = useKBar();
  const { results } = useMatches();

  return (
    <>
      <button
        aria-label="Abrir menu de comandos"
        aria-haspopup="dialog"
        className={styles.button}
        onClick={() => query.toggle()}
      >
        <LuCommand size={22} aria-hidden />
      </button>
      <KBarPortal>
        <KBarPositioner className={styles.positioner}>
          <KBarAnimator className={styles.animator}>
            <div className={styles.item}>
              <LuSearch size={22} aria-hidden />
              <KBarSearch className={styles.search} defaultPlaceholder="Escreva um comando ou uma busca." />
              <div className={styles.shortcut} aria-hidden>
                <kbd className={styles.shortcutIcon}>esc</kbd>
              </div>
            </div>
            <KBarResults
              items={results}
              onRender={({ active, ...render }) => {
                const item = render.item as ExtendedAction;

                if (typeof item === 'string') {
                  return (
                    <div className={styles.groupName} role="heading" aria-level={3}>
                      {item}
                    </div>
                  );
                }

                return (
                  <div className={styles.item} data-active={active}>
                    <span aria-hidden>{item.icon}</span>
                    <span className={styles.label}>{item.name}</span>

                    {item.language && <span className={styles.flag}>{item.language}</span>}
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
