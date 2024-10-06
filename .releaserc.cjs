const packagePath = `${process.cwd()}/package.json`;
const packageJson = require(packagePath);

module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { breaking: true, release: 'major' },
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'chore', release: false }
        ]
      }
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md']
      }
    ],
    [
      'semantic-release-replace-plugin',
      {
        replacements: [
          {
            files: [`${process.cwd()}/dist/**/*.js`],
            from: '"0.0.0"',
            to: '"${nextRelease.version}"'
          },
          {
            files: [packagePath],
            from: `"version": "${packageJson.version}"`,
            to: '"version": "${nextRelease.version}"',
            results: [
              {
                file: packagePath,
                hasChanged: true,
                numMatches: 1,
                numReplacements: 1
              }
            ],
            countMatches: true
          }
        ]
      }
    ],
    [
      '@semantic-release/exec',
      {
        publishCmd: 'pnpm publish --no-git-checks'
      }
    ]
  ]
};
