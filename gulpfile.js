const {src, dest, series, watch} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const prefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();



//scss Task
const scssTask = function () {
    return src ('dist/scss/*.scss')
    .pipe(scss())
    .pipe(postcss([cssnano(), prefixer()]))
    .pipe(dest('dist/css/'))
};


//serve browser
const serveBrowser = function(cb) {
    browserSync.init({
        server : {
            baseDir : 'dist/'
        }
    })
    cb();
};


//reload browser
const reloadBrowser = function (cb) {
    browserSync.reload();
    cb();
};



//watch Task
const watchTask = function () {
    watch('dist/js/*.js', reloadBrowser);
    watch('dist/scss/*.scss', series(scssTask, reloadBrowser));
    watch('dist/*.html', reloadBrowser);
};


exports.default = series (
    scssTask,
    serveBrowser,
    watchTask
)

