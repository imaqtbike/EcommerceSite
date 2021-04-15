const { src, dest, parallel, watch, series } = require("gulp"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass"),
  pug = require("gulp-pug"),
  browserSync = require("browser-sync").create();


const FilesPath = {sassFiles: "sass/**/*", htmlFiles: "pages/**/*.pug",jsFiles: "js/**/*",};


function sassTask() {
  return src(FilesPath.sassFiles).pipe(sass()).pipe(concat("style.css")).pipe(dest("./dist")).pipe(browserSync.stream());
}

function htmlTask() {
  return src(FilesPath.htmlFiles)
    .pipe(pug({ pretty: true }))
    .pipe(dest("./dist"))
    .pipe(browserSync.stream());
}

function jsTask() {
  return src(FilesPath.jsFiles).pipe(dest("./dist"));
}

function assetsTask() {
  return src("assets/**/*").pipe(dest("dist/assets"));
}

function server() {
  browserSync.init({server: {baseDir: "./dist"}});
  watch(FilesPath.sassFiles, sassTask);
  watch(FilesPath.htmlFiles, htmlTask);
  watch(FilesPath.jsFiles, jsTask);
}

exports.js = jsTask;
exports.sass = sassTask;
exports.pug = htmlTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, sassTask, assetsTask, jsTask));
exports.server = series(server, parallel(htmlTask, sassTask, assetsTask, jsTask));
