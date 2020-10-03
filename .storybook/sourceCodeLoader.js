const cache = require('./sourceCodeCache')

/**
 * @this {import('webpack').loader.LoaderContext}
 * @param source
 */
module.exports = function sourceCodeLoader(source) {
  // root of source code
  const { sourceRoot } = this.query || { sourceRoot: '' }
  const path = this.resourcePath
  console.log('\npath:', path)
  // cache source code by relative path
  if (path.startsWith(sourceRoot)) {
    const key = path.substr(sourceRoot.length)
    cache.set(key, source)
  }

  return source
}
