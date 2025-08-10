import { resolve } from 'path';

export default {
  library: {
    entryPoints: ['./src/**/index.ts', './src/include/*.ts'],
    externals: [/^@blueprintui\/crane/, /^lit/, /^tslib/]
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

          bp-crane {
            display: grid;
            gap: 12px;
            grid-template-columns: repeat(7, 1fr);
            padding: 6px;
            border: 1px solid #ccc;
            margin-bottom: 24px;
          }

          [draggable] {
            background: #e1e1e1;
            display: flex;
            place-items: center;
            justify-content: center;
            padding: 12px;
            border: 4px solid #e1e1e1;
            height: 100px;
          }

          [draggable='false'] {
            display: block;
            background: #ececec;
            border: 2px dashed #c1c1c1;
          }

          [bp-crane*='active'] {
            opacity: 0.6;
          }

          [bp-crane*='target'] {
            border-left: 4px solid blue;
          }
        </style>
      `;
    }
  }
};
