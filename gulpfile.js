var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('sass', function () {
    return gulp.src('sass/*.scss')
        .pipe(sass({
            style: "compressed"
        }))
        .pipe(gulp.dest('css/'));
});

gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);