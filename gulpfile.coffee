gulp = require 'gulp'
browserify = require 'gulp-browserify'
rename = require 'gulp-rename'
connect = require 'gulp-connect'
webserver = require 'gulp-webserver'

gulp.task 'browserify', () ->
	gulp.src "./app/main.coffee", read: false
		.pipe browserify 
			transform: ["coffee-reactify"]
			debug: true
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
			livereload: true
			fallback: 'index.html'

gulp.task 'watch', () ->
	watch = (path, task) ->
		gulp.watch [path], (events) ->
			console.log events.path + ' changed'
			gulp.start task

	watch './app/index.html', 'dist'
	watch ("./app/**/*.#{ex}" for ex in ['coffee', 'cjsx']), 'browserify'

gulp.task 'default', ['dist', 'browserify', 'serve', 'watch']