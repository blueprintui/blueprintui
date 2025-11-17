import { mkdirSync, writeFileSync } from 'fs';
import { generate as generateReact } from 'custom-element-types/react.js';
import { generate as generatePreact } from 'custom-element-types/preact.js';
import { generate as generateAngular } from 'custom-element-types/angular.js';
import { generate as generateTypeScript } from 'custom-element-types/typescript.js';
import { generate as generateBlazor } from 'custom-element-types/blazor.js';
import rawManifest from './dist/custom-elements.json' with { type: 'json' };

/**
 * Normalize manifest so declarations have required arrays for custom-element-types 0.0.3.
 * The library calls .filter() on .members and .events without guarding, so missing values cause a crash.
 */
function normalizeManifest(manifest) {
  const normalized = JSON.parse(JSON.stringify(manifest));
  for (const mod of normalized.modules ?? []) {
    for (const decl of mod.declarations ?? []) {
      if (decl.members === undefined) decl.members = [];
      if (decl.events === undefined) decl.events = [];
    }
    for (const exp of mod.exports ?? []) {
      const decl = exp?.declaration;
      if (decl && typeof decl === 'object') {
        if (decl.members === undefined) decl.members = [];
        if (decl.events === undefined) decl.events = [];
      }
    }
  }
  return normalized;
}

const customElementsManifest = normalizeManifest(rawManifest);

const dist = './dist/integration';

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
