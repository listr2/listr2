module.exports = {
  branches: [
    'main',
    'master',
    'next',
    'next-major',
    {
      name: 'alpha',
      prerelease: true
    },
    {
      name: 'beta',
      prerelease: true
    },
    {
      name: 'rc',
      prerelease: true
    }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/git',
      {
        assets: [ 'CHANGELOG.md', 'README.md', 'docs/' ]
      }
    ],
    '@semantic-release/npm',
    '@semantic-release/github'
  ]
}
