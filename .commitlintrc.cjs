module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'build',
        'release',
        'deps',
        'docs',
        'examples',
        'components',
        'crane',
        'grid',
        'icons',
        'layout',
        'themes',
        'typewriter',
        'typography'
      ]
    ],
    'body-empty': [0, 'never'],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-exclamation-mark': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [0, 'always', 100],
    'body-max-length': [0, 'always', 100],
    'footer-max-line-length': [0, 'always', 100],
    'footer-leading-blank': [0, 'always'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['chore', 'feat', 'fix']]
  }
};
