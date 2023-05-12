import { writeFile, mkdirSync, existsSync, copyFile } from 'node:fs';
import browserslist from 'browserslist';
import { transform, browserslistToTargets } from 'lightningcss';
import { styles } from './src/index.js';

if (!existsSync('./dist/lib')) {
  mkdirSync('./dist/lib', { recursive: true });
}

const targets = browserslistToTargets(browserslist('Chrome > 112'));
writeFile('./dist/lib/index.css', buildCSS(styles, { targets }), () => {});
writeFile('./dist/lib/index.min.css', buildCSS(styles, { targets, minify: true }), () => {});

if (!process.env.WATCH_REPORT_DEPENDENCIES >= 1) {
  copyFile('./LICENSE.md', './dist/lib/LICENSE.md', () => {});
  copyFile('./README.md', './dist/lib/README.md', () => {});
  copyFile('./package.lib.json', './dist/lib/package.json', () => {});
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

  return `/*! @blueprintui/typography | MIT license | https://blueprintui.dev/docs/typography */\n${result}`;
}
