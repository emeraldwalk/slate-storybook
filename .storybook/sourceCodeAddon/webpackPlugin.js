const cache = require('./cache')

class SourceCodePlugin {
  /** @param compiler {import('webpack').Compiler} */
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'SourceCodePlugin',
      (compilation, callback) => {
        // stringify our cache of source code
        const obj = {}
        for (const [key, value] of cache) {
          obj[key] = value
        }
        const sourceCode = JSON.stringify(obj, undefined, 2)

        // turns it into an asset
        compilation.assets['sourceCode.json'] = {
          source: () => sourceCode,
          size: () => sourceCode.length,
        }

        callback()
      }
    )
  }
}

module.exports = SourceCodePlugin
