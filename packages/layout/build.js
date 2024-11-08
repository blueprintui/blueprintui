import { writeFile, mkdirSync, existsSync, copyFile } from 'node:fs';
import browserslist from 'browserslist';
import { transform, browserslistToTargets } from 'lightningcss';
import { styles } from './src/index.js';

if (!existsSync('./dist')) {
  mkdirSync('./dist', { recursive: true });
}

const targets = browserslistToTargets(browserslist('Chrome > 112'));
const compatabilityTargets = browserslistToTargets(browserslist('Chrome > 110'));

writeFile('./dist/index.js', `export const VERSION = "0.0.0";`, () => {});
writeFile('./dist/index.css', buildCSS(styles, { targets }), () => {});
writeFile('./dist/index.min.css', buildCSS(styles, { targets, minify: true }), () => {});

if (!process.env.WATCH_REPORT_DEPENDENCIES >= 1) {
  writeFile('./dist/index.compat.css', buildCSS(styles, { targets: compatabilityTargets }), () => {});
  writeFile('./dist/index.compat.min.css', buildCSS(styles, { targets: compatabilityTargets, minify: true }), () => {});
  // copyFile('./LICENSE.md', './dist/LICENSE.md', () => {});
  // copyFile('./README.md', './dist/README.md', () => {});
  // copyFile('./package.lib.json', './dist/package.json', () => {});
}

function buildCSS(styles, options) {
  const result = transform({
    targets: {
      chrome: 112
    },
    drafts: {
      nesting: true
    },
    analyzeDependencies: true,
    code: Buffer.from(styles),
    minify: false,
    sourceMap: false,
    ...options
  })
    .code.toString()
    .replaceAll('container-type:inline-size', 'container-type:inline-size;')
    .replaceAll('&>*', ';&>*');

  return `/*! @blueprintui/layout | MIT license | https://blueprintui.dev/docs/layout */\n${result}`;
}
