var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
//var svgSprite = require('gulp-svg-sprite');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


var sassinput = './scss/**/*.scss';
var sassoutput = './css/';
var spriteinput = './images/svgs/**/*.svg';
var spriteoutput = './images/';
var jsFiles = './js/**/*.js';
var jsDest = './js';


var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

var config = {
  mode: {
    symbol: { // symbol mode to build the SVG
      dest: 'sprite', // destination folder
      sprite: 'sprite.svg', //sprite name
      example: false // Build sample page
    }
  },
  svg: {
    xmlDeclaration: false, // strip out the XML attribute
    doctypeDeclaration: false // don't include the !DOCTYPE declaration
  }
};


gulp.task('sass', function () {
  return gulp
    .src(sassinput)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(sassoutput));
});

gulp.task('sprite-page', function() {
  return gulp.src(spriteinput)
    .pipe(svgSprite(config))
    .pipe(gulp.dest(spriteoutput));
});

gulp.task('sprite-shortcut', function() {
  return gulp.src('sprite/sprite.svg')
    .pipe(gulp.dest(spriteoutput));
});

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('thesprites', ['sprite-page', 'sprite-shortcut']);


//Watch task
gulp.task('default',function() {
    gulp.watch(sassinput,['sass']);
});