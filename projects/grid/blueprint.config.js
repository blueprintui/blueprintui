import { resolve } from 'path';

export default {
  library: {
    entryPoints: ['./src/**/index.ts', './src/include/*.ts'],
    externals: [/^tslib/, /^lit/, /^@blueprintui/]
  },
  drafter: {
    dist: './.drafter',
    schema: './dist/custom-elements.json',
    examples: './src/**/*.examples.js',
    head: () => {
      return /* html */ `
        <script type="module">
          import normalize from 'modern-normalize/modern-normalize.css' with { type: 'css' };
          import themes from '@blueprintui/themes/index.min.css' with { type: 'css' };
          import typography from '@blueprintui/typography/index.css' with { type: 'css' };
          import dark from '@blueprintui/themes/dark/index.min.css' with { type: 'css' };
          import layout from '@blueprintui/layout/index.css' with { type: 'css' };
          document.adoptedStyleSheets = [...document.adoptedStyleSheets, normalize, themes, typography, dark, layout];
          document.documentElement.setAttribute('bp-theme', '');
          document.documentElement.lang = navigator.language;
        </script>
        <style>
          body {
            padding: 24px;
            margin: 0;
            background: var(--bp-layer-background-100);
          }

          :not(:defined) {
            visibility: hidden;
          }
        </style>
      `;
    }
  }
};
