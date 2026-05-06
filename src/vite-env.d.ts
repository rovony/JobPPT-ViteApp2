/// <reference types="vite/client" />

declare module '*.svg?react' {
  import React from 'react';
  const Component: React.FC<React.SVGProps<SVGSVGElement>>;
  export default Component;
}

declare module '*.md?raw' {
  const content: string;
  export default content;
}

// Runtime globals loaded by external scripts at deck-render time.
// Used by pharmagent components across multiple deck versions.
interface Window {
  Motion?: any;
  framerMotion?: any;
  PA_DATA?: any;
  Recharts?: any;
}
