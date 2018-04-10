const path = require('path');

module.exports = {
  // 开发环境相关配置
  dev: {
    // 路径相关
    assetsPublicPath: '/',
    assetsSubDirectory: 'static',

    // devServer相关
    host: 'localhost',
    port: '9999',
    clientLogLevel: 'info',
    autoOpenBrowser: false,
    proxyTable: {},
    quiet: false
  },

  // 生产环境
  // 最终构建相关配置
  build: {
    // 路径相关
    // 生成文件的根目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '/',
    assetsSubDirectory: 'static'
  }
}
