gulp = require 'gulp'
browserify = require 'gulp-browserify'
rename = require 'gulp-rename'
webserver = require 'gulp-webserver'

external_libraries = ['firebase', 'markdown', 'react', 'react/addons', 'react-router', 'reactfire']

gulp.task 'browserify:vendor', () ->
	gulp.src "./app/noop.js", read: false
		.pipe browserify
			debug: true
		.on 'prebundle', (bundle) ->
			bundle.require lib for lib in external_libraries
		.pipe rename "vendor.js"
		.pipe gulp.dest "./dist"

gulp.task 'browserify:app', () ->
	gulp.src "./app/main.coffee", read: false
		.pipe browserify 
			transform: ["coffee-reactify"]
			debug: true
			insertGlobals: true

		.on 'prebundle', (bundle) ->
			bundle.external lib for lib in external_libraries

		.on 'error', (err) ->
			console.log(err);
		.pipe rename "app.js"
		.pipe gulp.dest "./dist"

gulp.task 'dist', () -> 
	gulp.src './app/index.html'
	.pipe gulp.dest './dist'

gulp.task 'serve', () -> 
	gulp.src ['./dist']
		.pipe webserver
			fallback: 'index.html'

gulp.task 'watch', () ->
	watch = (path, task) ->
		gulp.watch [path], (events) ->
			console.log events.path + ' changed'
			gulp.start task

	watch './app/index.html', 'dist'
	watch ("./app/**/*.#{ex}" for ex in ['coffee', 'cjsx']), 'browserify:app'

gulp.task 'default', ['dist', 'browserify:vendor', 'browserify:app', 'serve', 'watch']