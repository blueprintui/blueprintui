import fs from 'node:fs';

const DRY_RUN = false;
const packageFilePath = `${process.cwd()}/package.json`;
const packageFile = JSON.parse(fs.readFileSync(packageFilePath));
const [_org, scope] = packageFile.name.split('/');

/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  dryRun: DRY_RUN,
  tagFormat: `${packageFile.name}-v\${version}`,
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          // catch all filter
          { breaking: true, release: false },
          { type: 'feat', release: false },
          { type: 'fix', release: false },
          { type: 'chore', release: false },
          // scope only matches trigger release
          { breaking: true, scope, release: 'major' },
          { type: 'feat', scope, release: 'minor' },
          { type: 'fix', scope, release: 'patch' }
        ]
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          ignoreCommits: `^(?![^]*\\(${scope}\\))(?![^]*\\[${scope}\\]).*$`
        }
      }
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md'
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
          }
        ]
      }
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'pnpm version ${nextRelease.version} --git-tag-version=false',
        publishCmd: `pnpm publish --no-git-checks ${DRY_RUN ? '--dry-run' : ''}`
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'projects/**/package.json', 'projects/**/CHANGELOG.md'],
        message: `chore(release): ${packageFile.name}` + '-v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ],
    [
      '@semantic-release/github',
      {
        success: '🎉 This issue has been resolved in version ${nextRelease.version} 🎉'
      }
    ]
  ]
};
