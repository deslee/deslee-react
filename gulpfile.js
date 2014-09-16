var gulp = require('gulp'),
connect = require('gulp-connect'),
react = require('gulp-react'),
sass = require('gulp-sass'),
less = require('gulp-less');

conf = {
	// dev or prod
	build: 'dev'
}

gulp.task('helloworld', function() {
	console.log('helloworld');
});

gulp.task('serve', function() {
	connect.server({
		root: ['./app'],
		livereload: true
	});

});

gulp.task('sass', function() {
    gulp.src('./app/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app'));
});

gulp.task('less', function() {
    gulp.src('./app/style/styles.less')
        .pipe(less())
        .pipe(gulp.dest('./app/style'));
});

gulp.task('jsx', function() {
	gulp.src('./app/**/*.jsx')
		.pipe(react()).pipe(gulp.dest('./app'));
})

gulp.task('watch', function() {
	var watchAsset = function(pathString) {
		gulp.watch(pathString, function() {
			gulp.src(pathString).pipe(connect.reload());
		});
	}

	gulp.watch('./app/**/*.jsx', function() {
		gulp.start('jsx');
	});

	gulp.watch('./app/**/*.scss', function() {
		gulp.start('sass');
	});

	gulp.watch('./app/**/*.less', function() {
		gulp.start('less');
	});

	watchAsset(['./app/**/*']);
})

// define tasks here
gulp.task('default', function() {
	switch (conf.build) {
		case 'dev': 
		gulp.start(['serve', 'jsx', 'sass', 'less', 'watch']);
		break;
	}
});