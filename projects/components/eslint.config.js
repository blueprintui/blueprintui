import { typescriptConfigs, rulesConfigs, litConfig, htmlConfig, cssConfig } from '@blueprintui-internals/eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [...rulesConfigs, ...typescriptConfigs, ...litConfig, ...htmlConfig, ...cssConfig];
