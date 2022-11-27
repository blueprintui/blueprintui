import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { readdir } from 'fs/promises';
import { resolve }  from 'path';

createRegistry(await clarityIcons());

async function clarityIcons() {
  const files = (await readdir('./svgs/clarity')).filter(f => f.includes('.svg'));
  const icons = { };
  files.forEach(file => {
    const svg = readFileSync(resolve('./svgs/clarity', file), 'utf8').toString().match(/<svg[^>]*>([\s\S]*?)<\/svg>/)[1];
    const name = file.replace('./svgs/clarity', '').replace('-line.svg', '').replace('-solid.svg', '');
    icons[name] = { ...icons[name], name };
    file.includes('-solid.svg') ? icons[name].solid = svg : icons[name].default = svg;
  });

  const names = Object.keys(icons).map(key => icons[key].name);
  return { icons, names, name: 'shapes' };
}

function createRegistry({ icons, names, name, viewBox }) {
  if (!existsSync(`./src/${name}`)) {
    mkdirSync(`./src/${name}`);
  }

  Object.keys(icons).forEach(key => {
    const icon = icons[key];
    const file = `./src/${name}/${icon.name}.ts`;
    writeFileSync(file, generateIcon(icon, viewBox));
  });

  writeFileSync(`./src/${name}/shapes.ts`, `export const shapes = [${names.map(n => `'${n}'`).join(', ')}];`);

  writeFileSync(`./src/${name}/index.ts`, `
export * from './shapes.js';
${Object.keys(icons).map(key => `export * from './${icons[key].name}.js';`).join('\n')}`);

writeFileSync(`./src/${name}/all.ts`, `${Object.keys(icons).map(key => `import '@blueprintui/icons/${name}/${icons[key].name}.js';`).join('\n')}`);
}

function kebabCaseToCamelCase(str) {
  return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
}

function generateIcon(icon, viewBox = 36) {
  const name = kebabCaseToCamelCase(icon.name);
  return `import { IconService, IconDefinition } from '@blueprintui/icons/internals';
export const ${name}Icon = {
  name: '${icon.name}',
  viewBox: ${viewBox},
  type: {
    default: '${icon.default}',${icon.solid ? `\n    solid: '${icon.solid}'` : ''}${icon.outline ? `\n    outline: '${icon.outline}'` : ''}
  }
};

declare module '@blueprintui/icons' {
  interface IconRegistry {
    ['${icon.name}']: IconDefinition;
  }
}

IconService.add(${name}Icon);
`;
}