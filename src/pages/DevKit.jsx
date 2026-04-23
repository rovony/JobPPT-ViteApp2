import React from 'react';
import { Outlet } from 'react-router-dom';
import DevKitSidebar from '@/components/devkit/DevKitSidebar';

/**
 * DevKit — shell page for the component catalog at /dev.
 *
 * Left sidebar for navigation; right pane renders the active sub-page
 * via React Router's <Outlet/>. All sub-pages live in
 * components/devkit/pages/* and are registered in App.jsx.
 */
export default function DevKit() {
  return (
    <div
      data-deck-theme="clinical"
      className="deck-root"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      <DevKitSidebar />
      <main
        style={{
          flex: 1,
          minWidth: 0,
          padding: 'var(--space-10) var(--space-12)',
          maxWidth: 1200,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}