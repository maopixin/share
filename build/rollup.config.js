const path = require('path');
const buble = require('rollup-plugin-buble');
const typescript = require('rollup-plugin-typescript');
const less = require('rollup-plugin-less');
const babel = require('rollup-plugin-babel');

const resolveFile = function (filePath) {
	return path.join(__dirname, '..', filePath)
}

module.exports = [
	{
		input: resolveFile('src/main.ts'),
		output: {
			file: resolveFile('dist/Share.js'),
			format: 'iife',
			name: 'Share',
			sourceMap: true
		},
		plugins: [
			less({
				insert: true,
				output: false
			}),
			// typescript({
			// 	lib: ['ES6','ES7','ESNext'],
			// 	target: 'ES5'
			// }),
			babel({
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			}),
			// buble(),
		],
	},
]