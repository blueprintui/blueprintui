import { createRequire } from 'module';
import { bundleAsync as bundleCss } from 'lightningcss';
import { copy } from '@web/rollup-plugin-copy';
import browsersync from 'rollup-plugin-browsersync';
import * as html from '@web/rollup-plugin-html';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const require = createRequire(import.meta.url);
const prod = !process.env.ROLLDOWN_WATCH;

// https://github.com/rolldown/rolldown/issues/4271
function cssExtract({ entry, output = 'index.css', minify = false } = {}) {
  return {
    name: 'css-extract',
    load(id) {
      if (id.endsWith('.css')) {
        return '';
      }
    },
    async generateBundle() {
      const { code } = await bundleCss({
        filename: path.resolve(__dirname, entry),
        minify,
        resolver: {
          resolve(specifier, from) {
            if (specifier.startsWith('.') || specifier.startsWith('/')) {
              return path.resolve(path.dirname(from), specifier);
            }
            const pkgName = specifier.startsWith('@')
              ? specifier.split('/').slice(0, 2).join('/')
              : specifier.split('/')[0];
            const subpath = specifier.slice(pkgName.length + 1);
            const pkgDir = path.dirname(require.resolve(`${pkgName}/package.json`, { paths: [path.dirname(from)] }));
            return path.resolve(pkgDir, subpath);
          }
        }
      });
      this.emitFile({ type: 'asset', fileName: output, source: code.toString() });
    }
  };
}

export default {
  input: './**/*.html',
  preserveEntrySignatures: false,
  platform: 'browser',
  moduleTypes: { '.css': 'js' },
  treeshake: {
    // tsdown #391 - Potential side effect imports preserved in ESM https://github.com/rolldown/tsdown/issues/391
    // rolldown #4738 - Non-deterministic moduleSideEffects https://github.com/rolldown/rolldown/issues/4738
    // rolldown #3336 - sideEffects resolution differences https://github.com/rolldown/rolldown/issues/3336
    // rolldown #2864 - Side-effectful module removed https://github.com/rolldown/rolldown/issues/2864
    moduleSideEffects: [
      { test: /\/include\//, sideEffects: true },
      { test: /\/shapes\//, sideEffects: true }
    ]
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
    cssExtract({ entry: '_site/index.css', minify: prod }),
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
