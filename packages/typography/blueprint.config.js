export default {
  library: {
    externals: []
  },
  drafter: {
    dist: './dist/drafter',
    examples: './src/**/index.examples.js',
    baseUrl: '/examples/',
    aliases: [{ find: /^@blueprintui\/typography\/(.+)\.css$/, replacement: `./dist/lib/$1.css` }],
    head: () => {
      return /* html */ `
        <script type="module">
          import normalize from 'modern-normalize/modern-normalize.css' assert { type: 'css' };
          import themes from '@blueprintui/themes/index.min.css' assert { type: 'css' };
          import typography from '@blueprintui/typography/index.css' assert { type: 'css' };
          import dark from '@blueprintui/themes/dark/index.min.css' assert { type: 'css' };
          import layout from '@blueprintui/layout/index.css' assert { type: 'css' };
          document.adoptedStyleSheets = [normalize, themes, typography, dark, layout];
          document.documentElement.setAttribute('bp-theme', 'dark');
          document.documentElement.lang = navigator.language;
        </script>
        <style>
          body {
            padding: 24px;
            margin: 0;
          }
        </style>
      `;
    }
  }
};
