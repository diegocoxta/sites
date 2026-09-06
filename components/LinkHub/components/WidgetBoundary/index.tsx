'use client';

import { Component, Suspense } from 'react';

import Skeleton from '~/components/Skeleton';

class WidgetErrorBoundary extends Component<React.PropsWithChildren, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function WidgetBoundary({ children }: React.PropsWithChildren) {
  return (
    <WidgetErrorBoundary>
      <Suspense
        fallback={
          <div style={{ marginTop: 16 }}>
            <Skeleton height={146} borderRadius={20} />
          </div>
        }
      >
        {children}
      </Suspense>
    </WidgetErrorBoundary>
  );
}
