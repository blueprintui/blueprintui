import { resolve } from 'path';

export default { 
  library: {
    entryPoints: ['./src/**/index.ts', './src/include/*.ts'],
    externals: [/^@blueprintui\/typewriter/, /^lit/, /^tslib/],
  },
  drafter: {
    dist: './dist/drafter',
    schema: './dist/lib/custom-elements.json',
    examples: './src/**/*.examples.js',
    aliases: [
      { find: /^@blueprintui\/typewriter\/(.+)/, replacement: resolve(process.cwd(), './dist/lib/$1') },
    ],
    head: () => {
      return /* html */`
        <style>
          button {
            width: 100px;
            height: 100px;
          }

          button:focus {
            background: #cfe5ff;
          }

          body {
            display: flex;
            gap: 12px;
          }

          body:has(bp-keylist[direction='block']) {
            flex-direction: column;
          }

          body:has(bp-keygrid) {
            display: grid;
            grid-template-columns: repeat(5, 100px);
          }
        </style>
      `;
    }
  }
};
