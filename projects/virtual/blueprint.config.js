export default {
  library: {
    entryPoints: ['./src/**/index.ts', './src/include/*.ts'],
    externals: [/^@blueprintui\/virtual/]
  },
  drafter: {
    dist: './.drafter',
    schema: './dist/custom-elements.json',
    examples: './src/**/*.examples.js',
    aliases: [],
    head: () => {
      return /* html */ `
        <style>
          html {
            box-sizing: border-box;
          }

          *, *:before, *:after {
            box-sizing: inherit;
          }

          bp-virtual-list {
            display: block;
            border: 1px solid #ccc;
          }

          .item {
            padding: 12px 16px;
            border-bottom: 1px solid #eee;
          }
        </style>
      `;
    }
  }
};
