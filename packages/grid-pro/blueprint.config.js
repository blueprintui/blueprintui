import { resolve } from 'path';

export default {
  library: {
    entryPoints: ['./src/**/index.ts', './src/include/*.ts'],
    externals: [/^tslib/, /^lit/, /^@floating-ui\/dom/, /^date-fns/, /^@blueprintui/]
  },
  drafter: {
    dist: './dist/drafter',
    schema: './dist/lib/custom-elements.json',
    examples: './src/**/*.examples.js',
    aliases: [
      { find: /^@blueprintui\/grid-pro\/(.+)/, replacement: resolve(process.cwd(), './dist/lib/$1') },
      { find: /^@blueprintui\/grid\/(.+)/, replacement: resolve(process.cwd(), '../grid/dist/lib/$1') },
      { find: /^@blueprintui\/components\/(.+)/, replacement: resolve(process.cwd(), '../components/dist/lib/$1') },
      { find: /^@blueprintui\/icons\/(.+)/, replacement: resolve(process.cwd(), '../icons/dist/lib/$1') },
      { find: /^@blueprintui\/themes\/(.+)/, replacement: resolve(process.cwd(), '../themes/dist/lib/$1') },
      { find: /^@blueprintui\/layout\/(.+)/, replacement: resolve(process.cwd(), '../layout/dist/lib/$1') },
      { find: /^@blueprintui\/typography\/(.+)/, replacement: resolve(process.cwd(), '../typography/dist/lib/$1') },
      { find: /^@blueprintui\/typewriter\/(.+)/, replacement: resolve(process.cwd(), '../typewriter/dist/lib/$1') }
    ],
    head: () => {
      return /* html */ `
        <script type="module">
          import normalize from 'modern-normalize/modern-normalize.css' assert { type: 'css' };
          import themes from '@blueprintui/themes/index.min.css' assert { type: 'css' };
          import typography from '@blueprintui/typography/index.css' assert { type: 'css' };
          import modern from '@blueprintui/themes/modern/index.min.css' assert { type: 'css' };
          import modernDark from '@blueprintui/themes/modern-dark/index.min.css' assert { type: 'css' };
          import layout from '@blueprintui/layout/index.css' assert { type: 'css' };
          document.adoptedStyleSheets = [normalize, themes, typography, modern, modernDark, layout];
          document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
          document.documentElement.lang = navigator.language;
        </script>
        <style>
          body {
            padding: 24px;
            margin: 0;
            background: var(--bp-layer-canvas-background);
          }

          :not(:defined) {
            visibility: hidden;
          }
        </style>
      `;
    }
  }
};
