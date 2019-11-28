var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var clean  = require('gulp-clean');
var fancy_log = require('fancy-log');

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task('clean-dist', function() {
    return gulp.src('dist/')
        .pipe(clean());
});

function bundle() {
    return watchedBrowserify
    .transform('babelify', {
        presets: ['es2015'],
        extensions: ['.ts']
    })
    .bundle()
    .pipe(source('share.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
};

gulp.task('default', gulp.series('clean-dist', bundle));
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', fancy_log);