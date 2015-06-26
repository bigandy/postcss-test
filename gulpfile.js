/* global require */
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),

	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer-core'),
	mqpacker = require('css-mqpacker'),
	csswring = require('csswring'),
	mixins = require('postcss-mixins'),
	nestedcss = require('postcss-nested'),
	postcssImport = require('postcss-import'),
	vars = require('postcss-simple-vars'),
	colours = require('./postcss/colours'),
	fs = require('fs'),
	inputCss = fs.readFileSync('postcss/style.css', 'utf8'),
	postcssRoot = require('postcss'),
	cssnext = require('gulp-cssnext'),
	simpleExtend = require('postcss-simple-extend'),
	focus = require('postcss-focus');


gulp.task('postcss', function () {
	var processors = [
		autoprefixer({browsers: ['last 1 version']}),
		postcssImport,
		mixins,
		mqpacker,
		csswring,
		simpleExtend,
		nestedcss,
		vars({ variables: colours }),
		focus,


		// cssnext({
		// 	browsers: ('last 1 version'),
		// 	compress: true,
		// 	sourcemap: true
		// })
	];
	return gulp.src(['./postcss/style.css', './postcss/font.css'])
		.pipe(postcss(processors))
		.pipe(gulp.dest('./build'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
	gulp.watch('postcss/**/*', ['postcss']);

	var server = livereload();
	gulp.watch([
		'style.css',
		'postcss/**'
	]).on('change', function(file) {
		server.changed(file.path);
	});
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [
	'postcss',
	'watch',
]);