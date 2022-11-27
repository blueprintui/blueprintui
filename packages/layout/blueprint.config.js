import { resolve } from 'path';

export default { 
  library: {
    externals: [],
  },
  drafter: {
    dist: './dist/examples',
    examples: './src/**/*.examples.js',
    baseUrl: '/examples/',
    aliases: [
      { find: /^@blueprintui\/layout\/(.+)/, replacement: resolve(process.cwd(), './dist/lib/$1') }
    ],
    head: () => {
      return /* html */`
        <script type="module">
          import normalize from 'modern-normalize/modern-normalize.css' assert { type: 'css' };
          import themes from '@blueprintui/themes/index.min.css' assert { type: 'css' };
          import modern from '@blueprintui/themes/modern/index.min.css' assert { type: 'css' };
          import modernDark from '@blueprintui/themes/modern-dark/index.min.css' assert { type: 'css' };
          import layout from '@blueprintui/layout/index.css' assert { type: 'css' };
          document.adoptedStyleSheets = [normalize, themes, modern, modernDark, layout];
          document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
        </script>
        <style>
          body {
            padding: 24px;
            margin: 0;
            background: var(--bp-layer-canvas-background);
          }

          [bp-layout] > div:not([bp-layout~='inline']):not([bp-layout~='block']):not([bp-layout~='grid']) {
            background: var(--bp-layer-container-background);
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
