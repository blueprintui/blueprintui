import { typescriptConfigs, rulesConfigs, litConfig, htmlConfig } from '@blueprintui-internals/eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [...rulesConfigs, ...typescriptConfigs, ...litConfig, ...htmlConfig];
