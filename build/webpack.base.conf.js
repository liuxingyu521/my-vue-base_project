// 工具模块
const path = require('path');
const utils = require('./utils');

// 项目相关模块
const project_config = require('../config/index');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // webpack的主目录
  // entry 和 module.rules.loader 选项
  // 相对于此目录
  context: path.resolve(__dirname, '..'),

  // 程序启动入口，多页面应用可配置多个
  entry: {
    app: './src/main.js'
  },

  // webpack 输出结果的相关选项
  output: {
    // 所有输出文件的目标路径
    path: project_config.build.assetsRoot,
    // 对应entry入口的每个出口文件
    filename: '[name].js',
    // 加载外部资源，的参考路径
    publicPath: process.env.NODE_ENV === 'production'
      ? project_config.build.assetsPublicPath
      : project_config.dev.assetsPublicPath
  },

  // 解析模块请求的选项
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },

  // webpack 如何处理处理模块的配置选项
  module: {
    // 模块匹配处理规则
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve('src')
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        loader: 'sass-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
