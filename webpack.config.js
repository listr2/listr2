const path = require('path')

module.exports = {
  entry: {
    'utils/rxjs': path.join(__dirname, '/src/utils/rxjs.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
    library: 'default',
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
  },
  mode: 'production'
}
