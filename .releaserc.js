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
    [
      "@google/semantic-release-replace-plugin",
      {
        "replacements": [
          {
            "files": ["./packages/components/dist/lib/internals/utils/define.js"],
            "from": "PACKAGE_VERSION",
            "to": "${nextRelease.version}",
            "results": [
              {
                "file": "./packages/components/dist/lib/internals/utils/define.js",
                "hasChanged": true,
                "numMatches": 1,
                "numReplacements": 1
              }
            ],
            "countMatches": true
          }
        ]
      }
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md"
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": ["CHANGELOG.md"]
      }
    ],
    [
      '@amanda-mitchell/semantic-release-npm-multiple',
      {
        registries: {
          components: {
            npmPublish: true,
            pkgRoot: './packages/components/dist/lib'
          },
          crane: {
            npmPublish: true,
            pkgRoot: './packages/crane/dist/lib'
          },
          grid: {
            npmPublish: true,
            pkgRoot: './packages/grid/dist/lib'
          },
          icons: {
            npmPublish: true,
            pkgRoot: './packages/icons/dist/lib'
          },
          layout: {
            npmPublish: true,
            pkgRoot: './packages/layout/dist/lib'
          },
          themes: {
            npmPublish: true,
            pkgRoot: './packages/themes/dist/lib'
          },
          typewriter: {
            npmPublish: true,
            pkgRoot: './packages/typewriter/dist/lib'
          },
          typography: {
            npmPublish: true,
            pkgRoot: './packages/typography/dist/lib'
          }
        }
      }
    ]
  ]
};