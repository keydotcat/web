const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkerPlugin = require('worker-plugin')

module.exports = {
  runtimeCompiler: true,
  lintOnSave: true,
  configureWebpack: {
    plugins: [new CopyWebpackPlugin([{ from: 'node_modules/argon2-browser/dist/argon2.js' }]), new WorkerPlugin()],
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' }
    },
    module: {
      // Makes WebPack think that we don't need to parse this module,
      // otherwise it tries to recompile it, but fails
      //
      // Error: Module not found: Error: Can't resolve 'env'
      noParse: /\.wasm$/,
      rules: [
        {
          test: /\.wasm$/,
          // Tells WebPack that this module should be included as
          // base64-encoded binary file and not as code
          loader: 'base64-loader',
          // Disables WebPack's opinion where WebAssembly should be,
          // makes it think that it's not WebAssembly
          //
          // Error: WebAssembly module is included in initial chunk.
          type: 'javascript/auto'
        }
      ]
    }
  }
}
