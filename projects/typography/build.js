import { writeFile, mkdirSync, existsSync } from 'node:fs';
import browserslist from 'browserslist';
import { transform, browserslistToTargets } from 'lightningcss';
import { styles } from './src/index.js';

if (!existsSync('./dist')) {
  mkdirSync('./dist', { recursive: true });
}

const targets = browserslistToTargets(browserslist('Chrome > 132'));
writeFile('./dist/index.js', `export const VERSION = "0.0.0";`, () => {});
writeFile('./dist/index.css', buildCSS(styles, { targets }), () => {});
writeFile('./dist/index.min.css', buildCSS(styles, { targets, minify: true }), () => {});

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
