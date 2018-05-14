var gulp = require('gulp');
var sass = require('gulp-sass'); //Sass to css
var useref = require('gulp-useref'); // combine js, css files
var browserSync = require('browser-sync').create(); //browser-sync reload browser
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano'); // min css
var imagemin = require('gulp-imagemin'); // min image
var cache = require('gulp-cache');
var del = require('del'); // clear project files
var runSequence = require('run-sequence');
var notify = require('gulp-notify');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var htmlmin = require('gulp-htmlmin');
var babel = require("gulp-babel");
var plumber = require('gulp-plumber');
var wait = require('gulp-wait');
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");



var paths = {
    html: ['app/*.html'],
    scss: ['app/scss/**/*.scss'],
    scripts: ['app/scripts/**/*.js'],
    image: ['app/images/**/*.+(png|jpg|jpeg|gif|svg|JPG)'],
    fonts: ['app/fonts/**/*']
};

//Tasks
gulp.task('css', function () {
    gulp.src(paths.scss) // Gets all files ending with .scss in app/scss
        .pipe(wait(500))
        .pipe(plumber())
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        .pipe(notify('Done!'))
        .pipe(browserSync.reload({
            stream: true
        }));
}); //Sass to css task

gulp.task('js', function () {
    return gulp.src(paths.scripts)
        .pipe(wait(500))
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        })).pipe(gulp.dest('app/js')).pipe(browserSync.reload({
            stream: true
        }));
});


gulp.task('useref', function () {
    return gulp.src(paths.html)
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
    return gulp.src(paths.image)
        // Caching images that ran through imagemin
        .pipe(cache(imagemin([
            imagemin.optipng({
                optimizationLevel: 3
            }),
            imagemin.jpegtran({
                progressive: true
            }), imagemin.svgo()
        ])))
        .pipe(gulp.dest('dist/images'));
}); // min image

gulp.task("webp", function () {
    return gulp.src("app/images/**/*.{png,jpg}")
        .pipe(webp({
            quality: 90
        }))
        .pipe(gulp.dest("dist/images"));
}); // Create WebP image

gulp.task("sprite", function () {
    return gulp.src("app/images/icon-*.svg")
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("dist/images"));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('dist/fonts'));
}); // Copy fonts to folder dist

gulp.task('clean:dist', function () {
    return del.sync('dist');
}); // clear dist



gulp.task('browserSync', ['css'], function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        port: 8080,
        open: true,
        notify: false
    });
}); //browserSync

gulp.task('minhtml', function () {
    return gulp.src('dist/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function (callback) {
    runSequence('clean:dist', ['css', 'useref', 'images', 'fonts'], 'minhtml',
        callback
    )
}) //build




gulp.task('watch', function () {
    gulp.watch(paths.scss, ['css']);
    gulp.watch(paths.html, browserSync.reload);
    gulp.watch(paths.scripts, ['js']);
}); // Gulp watch tack


gulp.task('default', function (callback) {
    runSequence(['browserSync', 'watch'],
        callback
    )
}); // default