module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-empty': [0, 'never'],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-exclamation-mark': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 100],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['chore', 'feat', 'fix']],
  }
};