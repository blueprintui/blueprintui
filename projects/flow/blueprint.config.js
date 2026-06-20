export default {
  library: {
    entryPoints: ['./src/**/index.ts', './src/include/*.ts'],
    externals: [/^@blueprintui\/flow/, /^lit/, /^tslib/]
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

          bp-flow {
            border: 1px solid #e1e1e1;
            display: block;
          }
        </style>
      `;
    }
  }
};
