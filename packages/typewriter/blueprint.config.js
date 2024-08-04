import { resolve } from 'path';

export default {
  library: {
    entryPoints: ['./src/**/index.ts', './src/include/*.ts'],
    externals: [/^@blueprintui\/typewriter/, /^lit/, /^tslib/]
  },
  drafter: {
    dist: './.drafter',
    schema: './dist/custom-elements.json',
    examples: './src/**/*.examples.js',
    aliases: [{ find: /^@blueprintui\/typewriter\/(.+)/, replacement: resolve(process.cwd(), './dist/$1') }],
    head: () => {
      return /* html */ `
        <style>
          button {
            width: 100px;
            height: 100px;
          }

          button:focus {
            background: #cfe5ff;
          }

          bp-keynav {
            display: flex;
            gap: 12px;
          }

          bp-keynav[layout='block'] {
            flex-direction: column;
          }

          bp-keynav[layout='grid'] {
            display: grid;
            grid-template-columns: repeat(4, 100px);
          }
        </style>
      `;
    }
  }
};
