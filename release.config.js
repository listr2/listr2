export default {
  extends: '@cenk1cenk2/semantic-release-config',
  plugins: [
    [
      '@cenk1cenk2/semantic-release-config/presets/npm',
      {
        client: 'pnpm',
        publish: 'staged',
        commit: {},
        changelog: {},
        lockfile: true
      }
    ],
    '@semantic-release/github'
  ]
}
