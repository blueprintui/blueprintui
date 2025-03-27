export default {
  library: {
    minify: false,
    entryPoints: ['./src/**/index.ts', './src/include/*.ts'],
    externals: [/^tslib/, /^lit/, /^@blueprintui/]
  },
  drafter: {
    dist: './.drafter',
    schema: './dist/custom-elements.json',
    examples: './src/**/element.examples.js',
    baseUrl: './',
    aliases: [],
    head: () => {
      return /* html */ `
        <script type="module">
          import '@blueprintui/components/include/lazy.js';
          import normalize from 'modern-normalize/modern-normalize.css' with { type: 'css' };
          import themes from '@blueprintui/themes/index.min.css' with { type: 'css' };
          import typography from '@blueprintui/typography/index.min.css' with { type: 'css' };
          import layout from '@blueprintui/layout/index.css' with { type: 'css' }; // minified broken
          import dark from '@blueprintui/themes/dark/index.min.css' with { type: 'css' };
          document.adoptedStyleSheets = [...document.adoptedStyleSheets, normalize, themes, typography, layout, dark];
          document.documentElement.setAttribute('bp-theme', '');
        </script>
        <style>
          html,
          body {
            height: 100%;
          }

          body {
            padding: 24px;
            margin: 0;
          }

          body:has(bp-shell) {
            padding: 0;
          }
        </style>
      `;
    }
  }
};
