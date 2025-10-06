import * as defaultTheme from './default.theme.js';
import * as darkTheme from './dark.theme.js';
import * as compactTheme from './compact.theme.js';
import { minify } from 'csso';
import { writeFileSync, mkdirSync } from 'node:fs';

const camelCaseToKebabCase = str =>
  str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/([a-z])(\d)/g, '$1-$2');

const commentBlock = `/**
 * @blueprintui/themes | MIT license | https://github.com/blueprintui
 */\n`;

const baseStyles = /* css */ `
 @container style(--bp-layer: 200) {
   :state(bp-layer) {
     --background: var(--bp-layer-background-200);
     --bp-layer: 300;
   }
 }
 @container style(--bp-layer: 300) {
   :state(bp-layer) {
     --background: var(--bp-layer-background-300);
     --bp-layer: 200;
   }
 }
 [bp-theme] body {
   --background: var(--bp-layer-background-100);
   --bp-layer: 200;
   background: var(--background);
 }
`;

function createThemes(name, themeModule) {
  const javascript =
    `${commentBlock}\n` +
    Object.entries(themeModule)
      .map(([key, value]) => {
        return `export const ${key} = \`${value}\`;`;
      })
      .join('\n');

  const typescript =
    `${commentBlock}\n` +
    Object.entries(themeModule)
      .map(([key, value]) => {
        return `export const ${key}: string;`;
      })
      .join('\n');

  const json = JSON.stringify(themeModule, null, 2);

  const colorScheme = name === '' ? '  color-scheme: var(--bp-color-scheme, normal);\n' : '';
  const properties = Object.entries(themeModule)
    .map(([key, value]) => `    --bp-${camelCaseToKebabCase(key)}: ${value};`)
    .join('\n');
  const css = `${commentBlock}
@layer blueprintui {
  ${name === '' ? ':root, ' : ''}[bp-theme~="${name}"] {
  ${colorScheme}\n${properties}\n  }
  ${name === '' ? baseStyles : ''}\n}`;

  const cssMin = minify(css).css;

  return {
    javascript,
    typescript,
    json,
    css,
    cssMin
  };
}

const defaultFiles = createThemes('', defaultTheme);
const darkFiles = createThemes('dark', darkTheme);
const compactFiles = createThemes('compact', compactTheme);

mkdirSync('dist', { recursive: true });
mkdirSync('dist/dark', { recursive: true });
mkdirSync('dist/compact', { recursive: true });

writeFileSync(`dist/index.js`, defaultFiles.javascript);
writeFileSync(`dist/index.d.ts`, defaultFiles.typescript);
writeFileSync(`dist/index.json`, defaultFiles.json);
writeFileSync(`dist/index.css`, defaultFiles.css);
writeFileSync(`dist/index.min.css`, defaultFiles.cssMin);

writeFileSync(`dist/dark/index.js`, darkFiles.javascript);
writeFileSync(`dist/dark/index.d.ts`, darkFiles.typescript);
writeFileSync(`dist/dark/index.json`, darkFiles.json);
writeFileSync(`dist/dark/index.css`, darkFiles.css);
writeFileSync(`dist/dark/index.min.css`, darkFiles.cssMin);

writeFileSync(`dist/compact/index.js`, compactFiles.javascript);
writeFileSync(`dist/compact/index.d.ts`, compactFiles.typescript);
writeFileSync(`dist/compact/index.json`, compactFiles.json);
writeFileSync(`dist/compact/index.css`, compactFiles.css);
writeFileSync(`dist/compact/index.min.css`, compactFiles.cssMin);
