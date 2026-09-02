'use client';

import { Component, Suspense, type ReactNode } from 'react';

import styles from './styles.module.css';

class WidgetErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function WidgetBoundary({ children }: { children: ReactNode }) {
  return (
    <WidgetErrorBoundary>
      <Suspense fallback={<div className={styles.skeleton} aria-hidden />}>{children}</Suspense>
    </WidgetErrorBoundary>
  );
}
