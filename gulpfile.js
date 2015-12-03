var gulp = require('gulp'),
    webpack = require("webpack-stream");

gulp.task('default', function() {
    return gulp.src('src/arrowFunctions/expressionBodies.js')
        .pipe(webpack({
            watch: true
        }))
        .pipe(gulp.dest('dist'));
});