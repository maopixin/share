const path = require('path');
const buble = require('rollup-plugin-buble');
const typescript = require('rollup-plugin-typescript');

const resolveFile = function(filePath) {
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
      typescript(),
      buble()
    ],
  },
]