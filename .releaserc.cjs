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
            pkgRoot: './packages/components'
          },
          crane: {
            npmPublish: true,
            pkgRoot: './packages/crane'
          },
          grid: {
            npmPublish: true,
            pkgRoot: './packages/grid'
          },
          icons: {
            npmPublish: true,
            pkgRoot: './packages/icons'
          },
          layout: {
            npmPublish: true,
            pkgRoot: './packages/layout'
          },
          themes: {
            npmPublish: true,
            pkgRoot: './packages/themes'
          },
          typewriter: {
            npmPublish: true,
            pkgRoot: './packages/typewriter'
          },
          typography: {
            npmPublish: true,
            pkgRoot: './packages/typography'
          }
        }
      }
    ]
  ]
};
