import { copy } from '@web/rollup-plugin-copy';
import styles from 'rollup-plugin-styles';
import browsersync from 'rollup-plugin-browsersync';
import * as html from '@web/rollup-plugin-html';
import path from 'path';

const prod = !process.env.ROLLDOWN_WATCH;

export default {
  input: './**/*.html',
  preserveEntrySignatures: false,
  platform: 'browser',
  treeshake: {
    // Rolldown #4738 - Non-deterministic moduleSideEffects
    // Rolldown #3336 - sideEffects resolution differences
    // Rolldown #2864 - Side-effectful module removed
    moduleSideEffects: [{ test: /\/include\//, sideEffects: true }]
  },
  resolve: {
    conditionNames: ['import', 'module', 'browser', 'default'],
    mainFields: ['module', 'main', 'browser'],
    extensions: ['.js', '.mjs', '.json']
  },
  output: {
    dir: 'dist',
    sourcemap: false,
    format: 'esm',
    assetFileNames: '[name][extname]',
    minify: prod
  },
  plugins: [
    copy({ rootDir: '_site', patterns: '**/*.{svg,jpg,png,json}' }),
    styles({
      minimize: false,
      mode: ['extract', 'index.css']
    }),
    html.rollupPluginHTML({
      rootDir: path.join(process.cwd(), '_site'),
      absoluteBaseUrl: 'https://example.com',
      minify: prod,
      flattenOutput: false,
      extractAssets: false,
      transformHtml: prod
        ? [
            html =>
              html
                .replace(`index.js"`, `index.js?v=${new Date().getTime()}"`)
                .replace(`index.css"`, `index.css?v=${new Date().getTime()}"`)
          ]
        : []
    }),
    !prod ? browsersync({ server: 'dist' }) : []
  ],
  watch: {
    clearScreen: false
  }
};
