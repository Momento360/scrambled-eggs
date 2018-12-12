const path = require('path');

module.exports = {
	entry: ['./src/module.js'],
	output: {
		filename: 'scrambled-eggs.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader'
			}
		]
	}
};
