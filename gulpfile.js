// ##########################
// IMPORTACIONES
// ##########################

const { dest, src, series, watch } = require('gulp');

// CSS
const sass = require('gulp-sass')( require('sass') );
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// IMAGES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// ##########################
// GULP TASKS
// ##########################

const compile = done => {

      src('./src/scss/main.scss')
            .pipe( sourcemaps.init() )
            .pipe( sass( { outputStyle: 'expanded' } ) )
            .pipe( postcss( [ autoprefixer(), cssnano() ] ) )
            .pipe( sourcemaps.write('.') )
            .pipe( dest('./build/css') )

      done();
}

const attention = () => {
      watch('./src/scss/**/*.scss', compile );
}

const images = () => {
      return src('./src/img/**/*')
            .pipe( imagemin( { optimizationLevel: 3 } ) )
            .pipe( dest('./build/img') );
}

const imageWebp = () => {

      return src('./src/img/**/*.{jpg,jpeg,png}')
            .pipe( webp( { quality: 50 } ) )
            .pipe( dest('./build/img') )

}

const imageAvif = () => {

      return src('./src/img/**/*.{jpg,jpeg,png}')
            .pipe( avif( { quality: 50 } ) )
            .pipe( dest('./build/img') )

}

// ##########################
// EXPORT TASKS
// ########################## 

exports.compile = compile;
exports.attention = attention;
exports.images = images;
exports.imageWebp = imageWebp;
exports.imageAvif = imageAvif;

exports.default = series( compile, attention );