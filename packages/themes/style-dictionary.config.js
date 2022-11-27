const StyleDictionary = require('style-dictionary');
const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;
const package = require('./package.json');
const csso = require('csso');
const fs = require('fs');
const glob = require('glob');

StyleDictionary.registerFileHeader({
  name: 'header',
  fileHeader: () => [`@blueprintui/themes v${package.version} | MIT license | https://github.com/blueprintui/themes`]
});

StyleDictionary.registerFormat({
  name: 'css/custom-selector',
  formatter: function({ dictionary, options, file }) {
    const themeSelector = `${options.name === '' ? ':root, ' : ''}[bp-theme~="${options.name}"]`;
    const colorScheme = `${options.name === '' ? '\n  color-scheme: var(--bp-color-scheme);' : ''}`;
    return `${fileHeader({ file })}\n${themeSelector} {${colorScheme}\n${formattedVariables({ format: 'css', dictionary, ...options })}\n}`;
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
        buildPath: 'dist/lib/',
        files: [{
          format: 'css/custom-selector',
          destination: `${name}/index.css`,
          filter
        }],
        options: {
          name,
          outputReferences: true,
          fileHeader: 'header'
        }
      },
      json: {
        buildPath: 'dist/lib/',
        files: [{
          format: 'json/nested',
          destination: `${name}/index.json`,
          filter
        }],
        options: {
          fileHeader: 'header'
        }
      },
      js: {
        transformGroup: 'js',
        transforms: ['name/cti/camel'],
        buildPath: 'dist/lib/',
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
          },
        ],
        options: {
          outputReferences: true,
          fileHeader: 'header'
        }
      }
    }
  });

  theme.buildAllPlatforms();
  const file = fs.readFileSync(`dist/lib/${name}/index.css`, 'utf8');
  fs.writeFileSync(`dist/lib/${name}/index.min.css`, csso.minify(file).css);
}

createTheme('');
glob.sync('./src/*.json').filter(f => !f.includes('index')).forEach(file => {
  const name = file.split('/').pop().split('.').shift();
  createTheme(name);
});
