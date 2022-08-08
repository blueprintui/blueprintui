import { copy } from '@web/rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import styles from 'rollup-plugin-styles';
import browsersync from 'rollup-plugin-browsersync';
import nodeResolve from '@rollup/plugin-node-resolve';
import html from '@web/rollup-plugin-html';
import path from 'path';

const prod = !process.env.ROLLUP_WATCH;

export default {
  input: './**/*.html',
  output: {
    dir: 'dist',
    sourcemap: false,
    format: 'esm',
    assetFileNames: '[name][extname]',
  },
  plugins: [
    copy({ rootDir: '_site', patterns: '**/*.{svg,jpg,png,json}' }),
    nodeResolve(),
    styles({
      minimize: prod,
      mode: ['extract', 'assets/index.css'],
    }),
    html({
      rootDir: path.join(process.cwd(), '_site'),
      absoluteBaseUrl: 'https://example.com',
      minify: prod,
      flattenOutput: false,
      extractAssets: false
    }),
    prod && terser({ output: { comments: false }, ecma: 2020, warnings: true, module: true, compress: { unsafe: true, passes: 2 } }),
    !prod ? browsersync({ server: 'dist' }) : [],
  ],
  watch: {
    clearScreen: false,
  },
};
