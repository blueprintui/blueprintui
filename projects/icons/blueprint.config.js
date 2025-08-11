export default {
  library: {
    sourcemap: true,
    entryPoints: ['./src/**/index.ts', './src/include.ts', './src/**/all.ts'],
    externals: [/^@blueprintui\/icons/, /^lit/, /^tslib/]
  },
  drafter: {
    dist: './.drafter',
    schema: './dist/custom-elements.json',
    examples: './src/**/*.examples.js',
    aliases: [
      // { find: /^@blueprintui\/icons\/(.+)/, replacement: resolve(process.cwd(), './dist/$1') }
      // { find: /^@blueprintui\/layout\/(.+)\.css$/, replacement: `../layout/dist/$1.css` },
      // { find: /^@blueprintui\/themes\/(.+)\.css$/, replacement: `../themes/dist/$1.css` },
      // { find: /^@blueprintui\/typography\/(.+)\.css$/, replacement: `../typography/dist/$1.css` },
    ],
    head: () => {
      return /* html */ `
        <script type="module">
          import '@blueprintui/components/include/lazy.js';
          import normalize from 'modern-normalize/modern-normalize.css' with { type: 'css' };
          import themes from '@blueprintui/themes/index.min.css' with { type: 'css' };
          import typography from '@blueprintui/typography/index.css' with { type: 'css' };
          import dark from '@blueprintui/themes/dark/index.min.css' with { type: 'css' };
          import layout from '@blueprintui/layout/index.min.css' with { type: 'css' };
          document.adoptedStyleSheets = [...document.adoptedStyleSheets, normalize, themes, typography, dark, layout];
          document.documentElement.setAttribute('bp-theme', 'dark');
          document.documentElement.lang = navigator.language;
          document.body.setAttribute('bp-text', 'content');
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
