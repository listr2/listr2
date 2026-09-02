export default {
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
        assets: ['CHANGELOG.md', 'README.md']
      }
    ],
    // TODO: @cenk1cenk2 — move staged publishing into @semantic-release/npm directly once custom publish command support lands, instead of shelling out via @semantic-release/exec
    // https://github.com/semantic-release/npm/issues/1160
    // @semantic-release/npm,
    [
      '@semantic-release/npm',
      {
        npmPublish: false
      }
    ],
    [
      '@semantic-release/exec',
      {
        publishCmd:
          "npm stage publish ${nextRelease.channel ? \"--tag \" + nextRelease.channel : \"\"} > /dev/null && node -p \"JSON.stringify({ name: 'npm package', url: 'https://www.npmjs.com/package/' + require('./package.json').name + '/v/${nextRelease.version}', channel: '${nextRelease.channel || \"latest\"}' })\""
      }
    ],
    '@semantic-release/github'
  ]
}
