var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');

gulp.task('compress-css', function() {
    return gulp.src('src/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));
});

gulp.task('compress-js', function() {
	return gulp.src('src/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['compress-js', 'compress-css']);