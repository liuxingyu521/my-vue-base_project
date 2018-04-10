const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const project_config = require('../config/index');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  // webpack 判断环境的属性
  mode: 'development',
  // 开发环境用的服务器
  devServer: {
    // 服务器地址
    host: project_config.dev.host,
    // 访问端口
    port: project_config.dev.port,
    // 此路径下的打包文件可在浏览器中访问
    publicPath: project_config.dev.assetsPublicPath,
    // 本地静态文件访问的目录，默认是以当前目录为根目录
    // 优先使用publicPath
    // 如果使用了 CopyWebpackPlugin 把静态文件和打包后的文件（bundle.js）放在一起
    // 此选项设为false
    contentBase: false,
    // 处理页面404时候，该跳转那个页面
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join((project_config.dev.assetsPublicPath, 'index.html')) }
      ]
    },
    // 启用webpack的模块热替换特性
    // 需要在 plugins选项中申明插件 HotModuleReplacementPlugin
    hot: true,
    // 控制台输出信息限制 none, error, warning 或者 info（默认）
    clientLogLevel: project_config.dev.clientLogLevel || 'info',
    // 一切服务启用 gzip压缩
    compress: true,
    // 是否在启动后打开浏览器
    open: project_config.dev.autoOpenBrowser,
    // 请求接口代理
    proxy: project_config.dev.proxyTable,
    // 控制台信息展示
    quiet: project_config.dev.quiet
  },

  // 开发用到的webpack插件
  plugins: [
    // 定义变量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    // 热替换插件
    new webpack.HotModuleReplacementPlugin(),
    // 在热替换时，在控制台展示被修改的文件名字
    new webpack.NamedModulesPlugin(),
    // 当发生错误时，不会编译打包输出错误的bundle文件
    new webpack.NoEmitOnErrorsPlugin(),
    // 自动生成html的插件
    new HtmlWebpackPlugin({
      // 输出到 output.path 的入口html文件名
      filename: 'index.html',
      // 使用现有的html模板
      template: 'index.html',
      // 打包后的js放在哪里 true or 'body' || 'head'
      inject: true
    }),
    // 将静态文件移到根目录
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: project_config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = devWebpackConfig;
