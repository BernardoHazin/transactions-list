const Dotenv = require('dotenv-webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  },
  pluginOptions: {
    apollo: {
      lintGQL: true
    }
  }
}
