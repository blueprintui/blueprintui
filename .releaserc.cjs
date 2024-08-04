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
            files: ['./packages/components/dist/internals/utils/define.js'],
            from: '0.0.0',
            to: '${nextRelease.version}',
            results: [
              {
                file: './packages/components/dist/internals/utils/define.js',
                hasChanged: true,
                numMatches: 2,
                numReplacements: 2
              }
            ],
            countMatches: true
          }
        ]
      }
    ],
    [
      '@amanda-mitchell/semantic-release-npm-multiple',
      {
        registries: {
          components: {
            npmPublish: true,
            pkgRoot: './packages/components/dist'
          },
          crane: {
            npmPublish: true,
            pkgRoot: './packages/crane/dist'
          },
          grid: {
            npmPublish: true,
            pkgRoot: './packages/grid/dist'
          },
          icons: {
            npmPublish: true,
            pkgRoot: './packages/icons/dist'
          },
          layout: {
            npmPublish: true,
            pkgRoot: './packages/layout/dist'
          },
          themes: {
            npmPublish: true,
            pkgRoot: './packages/themes/dist'
          },
          typewriter: {
            npmPublish: true,
            pkgRoot: './packages/typewriter/dist'
          },
          typography: {
            npmPublish: true,
            pkgRoot: './packages/typography/dist'
          }
        }
      }
    ]
  ]
};
