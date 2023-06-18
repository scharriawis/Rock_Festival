const {src, dest, watch, parallel} = require("gulp"); //un bojeto qué tiene funciones
//css
const sass = require("gulp-sass")(require('sass'));//conexion entre gulp y sass
const plumber = require("gulp-plumber");//sigue ejecutandose
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

//imagenes
const imagemin = require ("gulp-imagemin");
const cache = require("gulp-cache");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

//javaScript
const terser = require("gulp-terser-js");

function css(done){
    src("src/scss/**/*.scss")//identificar el archivo SASS
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())//compilarlo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/css"))//almacenarlo en el disco
    
    done();//callback
}

function imagenes (done){
    const opciones = {
        optimizationLevel: 3
    }

    src("src/img/**/*.{jpg,png}")
        .pipe(cache (imagemin(opciones)))
        .pipe(dest("build/img"))
    
    done();
}

function versionWebp(done){
    const opciones ={
        quality: 50
    };
    src("src/img/**/*.{jpg,png}")
        .pipe(webp(opciones))
        .pipe(dest("build/img"))

    done();
}

function versionAvif(done){
    const opciones ={
        quality: 50
    };
    src("src/img/**/*.{jpg,png}")
        .pipe(avif(opciones))
        .pipe(dest("build/img"))

    done();
}

function javaScript(done){
    src ("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/js"));
    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javaScript)

    done();
}

exports.css = css;
exports.js = javaScript
exports.versionWebp = versionWebp;
exports.imagenes = imagenes
exports.versionAvif = versionAvif;
exports.dev = parallel (imagenes, versionWebp, versionAvif, javaScript, dev);
