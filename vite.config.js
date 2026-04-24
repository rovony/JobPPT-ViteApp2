import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
  plugins: [
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react(),
    // Lets us import SVGs as React components: `import Foo from './foo.svg?react'`
    // Used in CS2 to inline the real Wikipedia world-map and CRUK bone-marrow
    // assets while keeping CSS-class-based country recoloring.
    svgr({
      include: '**/*.svg?react',
    }),
  ]
});