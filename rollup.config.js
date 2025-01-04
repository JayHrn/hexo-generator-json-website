const external = [
  'hexo-util',
  'keyword-extractor',
  'moment'
]

export default [{
  external,
  input: 'index.js',
  output: {
    format: 'esm',
    file: 'dist/index.js'
  }
}, {
  external,
  input: 'index.js',
  output: {
    format: 'cjs',
    file: 'dist/main.js'
  }
}]
