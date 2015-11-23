"use strict";

var gulp = require('gulp')
,	connect = require('gulp-connect') // runs a local web server
,	open = require('gulp-open') // opens the browser to a specified URL
,	browserify = require('browserify') // bundles JS files
,	reactify = require('reactify') // transforms React JSX to JS
,	source = require('vinyl-source-stream') // use conventional text streams with Gulp
,	concat = require('gulp-concat') // concatenates files
,	eslint = require('gulp-eslint') // lint JS and JSX files
;

// config object for useful data
var config = {
	port: 9005,
	devBaseUrl: "http://localhost",
	paths: {
		html: "./src/*.html",
		js: "./src/**/*.js*",
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/toastr.css'
		],
		images: "./src/images/*",
		MainJS: "./src/main.jsx",
		dist: "./dist"
	}
}

// starts a local dev server
gulp.task('connect', function(){
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

// copy all html files from src to dist then reconnect server
gulp.task('html', function(){
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

// bundle javascript from main.js to bundle.js
gulp.task('js', function(){
	browserify(config.paths.MainJS)
		.transform(reactify) // transform JSX to JS
		.bundle()
		.on('error', console.error.bind(console)) // send error messages to console
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + "/scripts")) // save bundle.js in dist/scripts folder
		.pipe(connect.reload()); // reconnect server
});

// bundle css files to 'dist/css/bundle.css'
gulp.task('css', function(){
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + "/css"));
});

// copy all images from src/images/ to dist/images/
gulp.task('images', function(){
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + "/images"))
		.pipe(connect.reload());
});

gulp.task('icon', function(){
	gulp.src('./src/favicon.ico')
		.pipe(gulp.dest(config.paths.dist));
});

// lint all js files using a config file and displaying errors
gulp.task('eslint', function(){
	return gulp.src(config.paths.js) // returning the function to receive and view the results
				.pipe(eslint({config: "eslint.config.json"})) // use a config file
				.pipe(eslint.format()); // use eslint.format as one way to output results
});

// open 'dist/index.html' at dev URL in browser after dev server is connected
gulp.task('open', ['connect'], function(){
	gulp.src('./dist/index.html')
		.pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

// watch for any saves of html and js files in src and run task 'html' or 'js'
gulp.task('watch', function(){
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'eslint']);
	gulp.watch(config.paths.images, ['images']);
});

// list of default tasks to run at Gulp's startup (command line 'gulp')
gulp.task('default', ['html', 'js', 'eslint', 'css', 'images', 'open', 'watch']);