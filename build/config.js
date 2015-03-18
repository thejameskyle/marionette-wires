var src = './src/';
var dest = './public/';
var lib = './lib/';
var test = './test/';
//var distrib = './dist/';

var all = '**/*.';
var allJS = all + 'js';

var jsFolder = src + '';

var js = {
	entries: [
		jsFolder + 'main.js'
	],
	destFile: 'bundle.js',
	all: jsFolder + allJS,
	libs: lib + allJS,
  libBundle: 'lib.js',
  tests: [
    test + 'setup/node.js',
    test + 'setup/helpers.js',
    test + 'unit/' + allJS
  ],
  allTests: test + allJS,
  dest: dest
};

var browserSync = {
  server: {
// We're serving the src folder as well
// for less sourcemap linking
    baseDir: [dest, src]
  },
  files: [
    dest + '/**',
// Exclude Map files
    '!' + dest + '/**.map'
  ]
};

var less = {
  src: src + 'main.less',
  cssLib: src + 'style/lib',
  dest: dest,
  bundle: 'bundle.css',
  all: src + all + 'less'
};

var browserify = {
  entries: js.entries,
  paths: ['./node_modules', jsFolder, js.libs], // allows you to omit './' when requiring local modules
  extensions: ['.jsx', '.tag'],
  noparse: js.libs
};

module.exports = {
  browserSync: browserSync,
	less: less,
  browserify: browserify,
  js: js,

  html: {
		src: src + 'index.html',
		dest: dest,
    all: src + '*.html'
	},

	images: {
		src: src + 'img/**',
		dest: dest + 'img'
	},

	release: true, // if build files or watch
  debug: true, // if source maps vs compression

  reporter: 'spec'
};
