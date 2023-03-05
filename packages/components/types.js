import { mkdirSync, writeFileSync } from 'fs';
import { generate as generateReact } from 'custom-element-types/react.js';
import { generate as generatePreact } from 'custom-element-types/preact.js';
import { generate as generateAngular } from 'custom-element-types/angular.js';
import { generate as generateTypeScript } from 'custom-element-types/typescript.js';
import { generate as generateBlazor } from 'custom-element-types/blazor.js';
import customElementsManifest from './dist/lib/custom-elements.json' assert { type: 'json' };

const dist = './dist/lib/integration';

const generator = {
  react: generateReact,
  preact: generatePreact,
  angular: generateAngular,
  typescript: generateTypeScript,
  blazor: generateBlazor
};

mkdirSync(`${dist}/react`, { recursive: true });
mkdirSync(`${dist}/preact`, { recursive: true });
mkdirSync(`${dist}/angular`, { recursive: true });

generator
  .react({ customElementsManifest, entrypoint: '@blueprintui/components' })
  .forEach(file => writeFileSync(`${dist}/react/${file.path}`, file.src.replaceAll('//', '/')));

generator
  .preact({ customElementsManifest, entrypoint: '@blueprintui/components' })
  .forEach(file => writeFileSync(`${dist}/preact/${file.path}`, file.src.replaceAll('//', '/')));

generator
  .angular({ customElementsManifest, entrypoint: '@blueprintui/components' })
  .forEach(file => writeFileSync(`${dist}/angular/${file.path}`, file.src.replaceAll('//', '/')));
