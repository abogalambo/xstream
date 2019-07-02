const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'home': './src/home.js'
	},
	output: {
		filename: '[name].bundle.js'	,
		path: path.resolve(__dirname, '../dist'),
		publicPath: ''
	},
	mode: 'development',
	devServer: {
		contentBase: path.resolve(__dirname, '../dist'),
		index: 'index.html',
		host: '0.0.0.0',
		port: 3000
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
					'style-loader', 'css-loader'
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
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Home',
			template: "./src/templates/home.html",
			filename: 'home.html',
			chunks: ['home']
		})
	]
}
