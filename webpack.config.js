const path = require('path')

module.exports = {
  entry: './src/utils/rxjs.ts',
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
  },
  mode: 'production',
  output: {
    filename: 'rxjs.js',
    path: path.resolve(__dirname, 'dist/utils/')
  }
}
