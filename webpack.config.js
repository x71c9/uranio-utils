const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	entry: {
		index: './src/html.ts',
		// print: './src/print.js',
	},
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
		hot: true
	},
	// plugins: [
	//   new HtmlWebpackPlugin({
	//     title: 'Development',
	//   }),
	// ],
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		// filename: '[name].bundle.js',
		// clean: true,
	},
};

