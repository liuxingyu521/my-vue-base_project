// 工具模块
const Path = require('path');
const webpack = require('webpack');

// 第三方插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/main',
	output: {
		filename: 'bundle.js',
		path: Path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: Path.join(__dirname, 'src'),
				use: ['babel-loader']
			},{
				test: /\.vue$/,
				use: ['vue-loader']
			}
		]
	},
	// 开发时临时的服务器
	devServer: {
		host: "0.0.0.0",
		compress: true,
		hot: true,
		open: false,
		port: 9898
	},
	resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'	// 在 import 或 require 时对路径的匹配映射
    }
  },
  plugins: [
  	new webpack.HotModuleReplacementPlugin(), // 开发时用，生产环境去掉
    new HtmlWebpackPlugin({
    	filename: 'index.html', // 生成的文件名字
    	template: 'index.html', // 以 index.html为模板
    	inject: true  // 将js脚本放置在body底部
    })
  ]
}
