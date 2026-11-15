import base from '../../release.config.js'

// only listr2 comments on and labels the issues that a release closes, so an issue gets one comment per release instead of one per package
export default {
  ...base,
  plugins: base.plugins.map((plugin) => (plugin === '@semantic-release/github' ? [plugin, { successCommentCondition: false, releasedLabels: false }] : plugin))
}

// force publish
