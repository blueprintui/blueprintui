
export default { 
  library: {
    externals: [],
  },
  drafter: {
    dist: './dist/docs/examples',
    examples: './src/**/*.examples.js',
    baseUrl: '/examples/',
    aliases: [
      { find: /^@blueprintui\/layout\/(.+)\.css$/, replacement: `./dist/$1.css` },
    ],
    head: () => {
      return /* html */`
        <script type="module">
          import normalize from 'modern-normalize/modern-normalize.css' assert { type: 'css' };
          import themes from '@blueprintui/themes/index.min.css' assert { type: 'css' };
          import layout from '@blueprintui/layout/index.min.css' assert { type: 'css' };
          document.adoptedStyleSheets = [normalize, themes, layout];
        </script>
        <style>
          body {
            padding: 24px;
            margin: 0;
          }

          [bp-layout] > div:not([bp-layout~='inline']):not([bp-layout~='block']):not([bp-layout~='grid']) {
            background: #f4f4f4;
            min-width: 60px;
            min-height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          [demo] {
            border: 1px solid #e6e6e6;
          }

          hr {
            border-color: #e6e6e6;
          }
        </style>
      `;
    }
  }
};
