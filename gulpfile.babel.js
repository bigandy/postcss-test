/* global require */
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),

	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer-core'),
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
	focus = require('postcss-focus'),
	colorFunction = require('postcss-color-function'),
	rows = require('postcss-rows');

gulp.task('postcss', () => {
	var processors = [
		autoprefixer({browsers: ['last 1 version']}),
		postcssImport,
		mixins(),
		simpleExtend,
		nestedcss,
		vars({ variables: colours }),
		focus,
		colorFunction,
		rows({
			multiplier: 16,
			unit: 'rows'
		})
	];
	return gulp.src([
			'./postcss/style.css',
			'./postcss/font.css'
		])
		.pipe(postcss(processors))
		.pipe(cssnext({
			browsers: ('last 1 version'),
			compress: true,
			sourcemap: false,
			safe: true
		}))
		.pipe(gulp.dest('./build'));
});

// Rerun the task when a file changes
gulp.task('watch', () => {
	gulp.watch('postcss/**/*', ['postcss']);

	var server = livereload();
	gulp.watch([
		'style.css',
		// 'postcss/**'
	]).on('change', (file) => {
		server.changed(file.path);
	});
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [
	'postcss',
	'watch',
]);