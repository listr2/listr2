// https://github.com/TypeStrong/ts-node/pull/1585
/*
loader.js

Usage (I'm also using dotenv, but you can omit the dotenv parts if needed):
DOTENV_CONFIG_PATH=.env node -r dotenv/config --loader=./loader.js /bin/path/to/cli.ts
*/
import { pathToFileURL } from 'node:url'
import { getFormat, load, resolve as resolveTs, transformSource } from 'ts-node/esm'
import * as tsConfigPaths from 'tsconfig-paths'

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig()
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths)

export function resolve (specifier, context, defaultResolver) {
  const mappedSpecifier = matchPath(specifier)

  if (mappedSpecifier) {
    specifier = `${mappedSpecifier}.js`

    /*
    the resolve functionality can only work with file URLs, so we need to convert, this is especially
    the case on windows, where the path might not be a valid URL.
    */
    const url = specifier.startsWith('file:') ? specifier : pathToFileURL(specifier.toString())

    return resolveTs(url.toString(), context, defaultResolver)
  } else {
    // If we can't find a mapping, just pass it on to the default resolver
    return resolveTs(specifier, context, defaultResolver)
  }
}

export { getFormat, transformSource, load }
