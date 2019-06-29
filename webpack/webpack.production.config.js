const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'home': './src/home.js'
	},
	output: {
		filename: '[name].[contenthash].js'	,
		path: path.resolve(__dirname, '../dist'),
		publicPath: ''
	},
	mode: 'production',
	optimization: {
		splitChunks: {
			chunks: "all",
			minSize: 30000,
			automaticNameDelimiter: '~'
		}
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|jpeg)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, 'css-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env', "@babel/preset-react" ]
					}
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Home',
			template: "./src/templates/home.html",
			filename: 'home.html',
			chunks: ['home', 'vendors~home']
		})
	]
}