const StyleDictionary = require('style-dictionary');
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;
const csso = require('csso');
const fs = require('fs');
const glob = require('glob');

StyleDictionary.registerFileHeader({
  name: 'header',
  fileHeader: () => [`@blueprintui/themes | MIT license | https://github.com/blueprintui`]
});

StyleDictionary.registerFormat({
  name: 'css/custom-selector',
  formatter: function ({ dictionary, options, file }) {
    const themeSelector = `${options.name === '' ? ':root, ' : ''}[bp-theme~="${options.name}"]`;
    const colorScheme = options.name === '' ? '  color-scheme: var(--bp-color-scheme, normal);\n' : '';

    const variables = formattedVariables({ format: 'css', dictionary, ...options })
      .trim()
      .split('\n')
      .map(v => {
        if (v.trim().startsWith('--bp-color')) {
          const [name, value] = v.trim().split(':');
          const prop = dictionary.allProperties.find(p => p.name.trim() === name.trim().replace('--', ''));
          console.log(name, value, prop.original.value);
          return `    ${name}: ${prop.original.value};`;
        } else {
          return v;
        }
      })
      .join('\n');

    const base = /* css */ `
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

    return `${fileHeader({ file })}
@layer blueprintui {
  ${themeSelector} {\n  ${colorScheme}  ${variables}\n  }\n  ${options.name === '' ? base : ''}}`;
  }
});

function createTheme(name) {
  const filter = name !== '' ? token => token.filePath.includes('theme') : null;

  const theme = StyleDictionary.extend({
    include: ['src/index.json'],
    source: [`src/${name.length ? `${name}.theme` : ''}.json`],
    platforms: {
      css: {
        prefix: 'bp',
        transformGroup: 'css',
        buildPath: 'dist/',
        files: [
          {
            format: 'css/custom-selector',
            destination: `${name}/index.css`,
            filter
          }
        ],
        options: {
          name,
          outputReferences: true,
          fileHeader: 'header'
        }
      },
      json: {
        buildPath: 'dist/',
        files: [
          {
            format: 'json/nested',
            destination: `${name}/index.json`,
            filter
          }
        ],
        options: {
          fileHeader: 'header'
        }
      },
      js: {
        transformGroup: 'js',
        transforms: ['name/cti/camel'],
        buildPath: 'dist/',
        files: [
          {
            format: 'javascript/es6',
            destination: `${name}/index.js`,
            filter
          },
          {
            format: 'typescript/es6-declarations',
            destination: `${name}/index.d.ts`,
            filter
          }
        ],
        options: {
          outputReferences: true,
          fileHeader: 'header'
        }
      }
    }
  });

  theme.buildAllPlatforms();
  const file = fs.readFileSync(`dist/${name}/index.css`, 'utf8');
  fs.writeFileSync(`dist/${name}/index.min.css`, csso.minify(file).css);
}

createTheme('');
glob
  .sync('./src/*.json')
  .filter(f => !f.includes('index'))
  .forEach(file => {
    const name = file.split('/').pop().split('.').shift();
    createTheme(name);
  });
