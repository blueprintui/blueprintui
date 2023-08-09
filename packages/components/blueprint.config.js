import { resolve } from 'path';

export default {
  library: {
    entryPoints: ['./src/**/index.ts', './src/include/*.ts'],
    externals: [
      /^tslib/,
      /^lit/,
      /^@lit-labs\/motion/,
      /^@floating-ui\/dom/,
      /^date-fns/,
      /^composed-offset-position/,
      /^@blueprintui/
    ]
  },
  drafter: {
    dist: './dist/drafter',
    schema: './dist/lib/custom-elements.json',
    examples: './src/**/element.examples.js',
    baseUrl: './',
    aliases: [
      { find: /^@blueprintui\/components\/(.+)/, replacement: resolve(process.cwd(), './dist/lib/$1') },
      { find: /^@blueprintui\/icons\/(.+)/, replacement: resolve(process.cwd(), '../icons/dist/lib/$1') },
      { find: /^@blueprintui\/themes\/(.+)/, replacement: resolve(process.cwd(), '../themes/dist/lib/$1') },
      { find: /^@blueprintui\/layout\/(.+)/, replacement: resolve(process.cwd(), '../layout/dist/lib/$1') },
      { find: /^@blueprintui\/typography\/(.+)/, replacement: resolve(process.cwd(), '../typography/dist/lib/$1') }
    ],
    head: () => {
      return /* html */ `
        <script type="module">
          import '@blueprintui/components/include/lazy.js';
          import normalize from 'modern-normalize/modern-normalize.css' assert { type: 'css' };
          import themes from '@blueprintui/themes/index.min.css' assert { type: 'css' };
          import typography from '@blueprintui/typography/index.min.css' assert { type: 'css' };
          import layout from '@blueprintui/layout/index.min.css' assert { type: 'css' };
          import dark from '@blueprintui/themes/dark/index.min.css' assert { type: 'css' };
          import modern from '@blueprintui/themes/modern/index.min.css' assert { type: 'css' };
          import modernDark from '@blueprintui/themes/modern-dark/index.min.css' assert { type: 'css' };
          document.adoptedStyleSheets = [normalize, themes, typography, layout, dark, modern, modernDark];
          document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
        </script>
        <style>
          html,
          body {
            height: 100%;
          }

          body {
            padding: 24px;
            margin: 0;
            background: var(--bp-layer-canvas-background);
          }

          body:has(bp-shell) {
            padding: 0;
          }
        </style>
      `;
    }
  }
};
