import { resolve } from 'path';

export default {
  library: {
    externals: []
  },
  drafter: {
    dist: './dist/examples',
    examples: './src/**/*.examples.js',
    baseUrl: '/examples/',
    aliases: [{ find: /^@blueprintui\/layout\/(.+)/, replacement: resolve(process.cwd(), './dist/$1') }],
    head: () => {
      return /* html */ `
        <script type="module">
          import normalize from 'modern-normalize/modern-normalize.css' with { type: 'css' };
          import themes from '@blueprintui/themes/index.min.css' with { type: 'css' };
          import dark from '@blueprintui/themes/dark/index.min.css' with { type: 'css' };
          import layout from '@blueprintui/layout/index.min.css' with { type: 'css' };
          document.adoptedStyleSheets = [...document.adoptedStyleSheets, normalize, themes, dark, layout];
          document.documentElement.setAttribute('bp-theme', 'dark');
          document.documentElement.lang = navigator.language;
        </script>
        <style>
          body {
            padding: 24px;
            margin: 0;
            background: var(--bp-layer-background-100);
          }

          [bp-layout] > div:not([bp-layout~='inline']):not([bp-layout~='block']):not([bp-layout~='grid']) {
            background: var(--bp-layer-background-200);
            min-width: 60px;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          [demo] {
            border: 1px solid var(--bp-object-border-color-200);
          }

          hr {
            border-color: var(--bp-text-color-500);
          }
        </style>
      `;
    }
  }
};
