const path = require('path')

const TS_CONFIG_PATH = path.join(process.cwd(), 'tsconfig.json')
const SRC_PATH = path.join(process.cwd(), 'src')

function makeModuleNameMapper (srcPath, tsconfigPath) {
  // Get paths from tsconfig
  const { paths } = require(tsconfigPath).compilerOptions

  const aliases = {}

  // Iterate over paths and convert them into moduleNameMapper format
  Object.keys(paths).forEach((item) => {
    const key = item.replace('/*', '/(.*)')
    const path = paths[item][0].replace('/*', '/$1')
    aliases[key] = srcPath + '/' + path
  })
  return aliases
}

module.exports = {
  moduleFileExtensions: [ 'js', 'json', 'ts' ],
  rootDir: '.', // SRC_PATH
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t)s$': 'ts-jest'
  },
  moduleNameMapper: makeModuleNameMapper(SRC_PATH, TS_CONFIG_PATH)
}