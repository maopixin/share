/*
 * @Author: your name
 * @Date: 2019-12-02 18:04:27
 * @LastEditTime : 2019-12-20 16:02:21
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share/build/rollup.config.js
 */
const path = require('path');
const buble = require('rollup-plugin-buble');
const typescript = require('rollup-plugin-typescript2');
const less = require('rollup-plugin-less');

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
			typescript({
				verbosity: 3,
				tsconfigDefaults: {
					extendedDiagnostics: false
				},
				useTsconfigDeclarationDir: true,
				objectHashIgnoreUnknownHack: true,
				clean: false,
				include: ['*.ts+(|x)', '**/*.ts+(|x)', '*.js+(|x)', '**/*.js+(|x)']
			}),
			buble(),
		],
	},
]