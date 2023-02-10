module.exports = {
  extends: ['stylelint-config-standard'],
  defaultSeverity: 'error',
  plugins: [],
  ignoreFiles: ["**/dist/**", "**/node_modules/**", "**/_site/**"],
  rules: {
    'import-notation': 'string',
    'declaration-block-no-redundant-longhand-properties': null,
    'media-feature-name-no-unknown': null,
    'declaration-empty-line-before': null,
    'function-calc-no-unspaced-operator': null,
    'no-descending-specificity': null,
    'no-duplicate-selectors': null,
    'no-invalid-position-at-import-rule': null,
    'custom-property-empty-line-before': null,
    'color-function-notation': null,
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
  },
};
