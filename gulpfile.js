//Based on article
//https://www.webstoemp.com/blog/switching-to-gulp4/
//https://github.com/jeromecoupe/jeromecoupe.github.io/blob/master/gulpfile.js

"use strict";

//npm init
//npm install --save-dev gulp-autoprefixer
const autoprefixer = require("autoprefixer");
//npm install browser-sync gulp --save-dev
const browsersync = require("browser-sync").create();
//npm install gulp-cssnano --save-dev
const cssnano = require("cssnano");
//npm install gulp --save-dev
const gulp = require("gulp");
//npm install gulp-newer --save-dev
const newer = require("gulp-newer");
//npm install --save-dev gulp-plumber
const plumber = require("gulp-plumber");
//npm install --save-dev gulp-postcss
const postcss = require("gulp-postcss");
//npm install postcss-custom-properties --save-dev
const postcssCustomProperties = require('postcss-custom-properties');
//const rename = require("gulp-rename");
//npm install gulp-sass --save-dev
const sass = require("gulp-sass");
//npm install gulp-sourcemaps --save-dev
const sourcemaps = require('gulp-sourcemaps');

const sassinput = './scss/**/*.scss';
const sassoutput = './css/';

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

const autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%']
};

//BrowserSync
function browserSync(done) {
  browsersync.init({
    // server: {
    //   baseDir: "./_site/"
    // },
    proxy: 'http://localhost:8888/',
    //port: 3000,
    open: false
  });
  done();
}

//BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

//CSS task
function css() {
  return gulp
    .src(sassinput)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(postcss([autoprefixer(autoprefixerOptions), cssnano({reduceIdents: false}), postcssCustomProperties()]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(sassoutput))
    .pipe(browsersync.stream());
}

//Watch files
function watchFiles() {
  gulp.watch(sassinput, css);
}

// define complex tasks
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.css = css;
exports.watch = watch;