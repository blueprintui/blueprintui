import { typescriptConfigs, rulesConfigs, htmlConfig } from '@blueprintui-internals/eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [...rulesConfigs, ...typescriptConfigs, ...htmlConfig];
