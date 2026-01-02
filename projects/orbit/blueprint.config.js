import { resolve } from 'path';

export default {
  library: {
    entryPoints: ['./src/**/index.ts'],
    externals: [/^@blueprintui\/orbit/]
  },
  drafter: {
    dist: './.drafter',
    schema: './dist/custom-elements.json',
    examples: './src/**/*.examples.js',
    aliases: [{ find: /^@blueprintui\/orbit\/(.+)/, replacement: resolve(process.cwd(), './dist/$1') }],
    head: () => {
      return /* html */ `
        <style>
        </style>
      `;
    }
  }
};
