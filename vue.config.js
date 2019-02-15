const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  runtimeCompiler: true,
  lintOnSave: true,
  configureWebpack: {
    plugins: [new CopyWebpackPlugin([{ from: 'node_modules/argon2-browser/dist/argon2-asm.min.js' }])]
  }
}
