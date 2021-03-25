const { src, dest, parallel, watch, series } = require("gulp"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass"),
  pug = require("gulp-pug"),
  browserSync = require("browser-sync").create();


const FilesPath = {sassFiles: "sass/**/*", htmlFiles: "pages/**/*.pug"};


function sassTask() {
  return src(FilesPath.sassFiles).pipe(sass()).pipe(concat("style.css")).pipe(dest("./dist")).pipe(browserSync.stream());
}

function htmlTask() {
  return src(FilesPath.htmlFiles)
    .pipe(pug({ pretty: true }))
    .pipe(dest("./dist"))
    .pipe(browserSync.stream());
}

function assetsTask() {
  return src("assets/**/*").pipe(dest("dist/assets"));
}

function server() {
  browserSync.init({server: {baseDir: "./dist"}});
  watch(FilesPath.sassFiles, sassTask);
  watch(FilesPath.htmlFiles, htmlTask);
}

exports.sass = sassTask;
exports.pug = htmlTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, sassTask, assetsTask));
exports.server = series(server, parallel(htmlTask, sassTask, assetsTask));
