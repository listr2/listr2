module.exports = {
  branches: [
    'master',
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
  verifyConditions: [ '@semantic-release/changelog', '@semantic-release/git' ],
  prepare: [
    '@semantic-release/changelog',
    {
      path: '@semantic-release/git',
      assets: [ 'CHANGELOG.md', 'README.md', 'docs/' ],
      message: 'chore(release): <%= nextRelease.version %> - <%= new Date().toISOString().slice(0,10).replace(/-/g,\'\') %> [skip ci]\n\n<%= nextRelease.notes %>'
    }
  ]
}
