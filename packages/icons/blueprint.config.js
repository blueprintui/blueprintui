import { resolve } from 'path';

export default { 
  library: {
    entryPoints: ['./src/**/index.ts', './src/include.ts', './src/**/all.ts'],
    externals: [/^@blueprintui\/icons/, /^lit/, /^tslib/],
  },
  drafter: {
    dist: './dist/drafter',
    schema: './dist/lib/custom-elements.json',
    examples: './src/**/*.examples.js',
    aliases: [
      { find: /^@blueprintui\/icons\/(.+)/, replacement: resolve(process.cwd(), './dist/lib/$1') }
      // { find: /^@blueprintui\/layout\/(.+)\.css$/, replacement: `../layout/lib/dist/$1.css` },
      // { find: /^@blueprintui\/themes\/(.+)\.css$/, replacement: `../themes/dist/lib/$1.css` },
      // { find: /^@blueprintui\/typography\/(.+)\.css$/, replacement: `../typography/dist/lib/$1.css` },
    ],
    head: () => {
      return /* html */`
        <script type="module">
        import '@blueprintui/components/include/lazy.js';
          import normalize from 'modern-normalize/modern-normalize.css' assert { type: 'css' };
          import themes from '@blueprintui/themes/index.min.css' assert { type: 'css' };
          import typography from '@blueprintui/typography/index.min.css' assert { type: 'css' };
          import layout from '@blueprintui/layout/index.min.css' assert { type: 'css' };
          import modern from '@blueprintui/themes/modern/index.min.css' assert { type: 'css' };
          import modernDark from '@blueprintui/themes/modern-dark/index.min.css' assert { type: 'css' };
          document.adoptedStyleSheets = [normalize, themes, typography, layout, modern, modernDark];
          document.documentElement.setAttribute('bp-theme', 'modern modern-dark');
          document.body.setAttribute('bp-text', 'content');
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
