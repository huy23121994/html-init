const { watch, src, dest, series } = require("gulp");
const sass = require("gulp-sass");
const livereload = require("gulp-livereload");
const rename = require("gulp-rename");
const template = require("gulp-template-html");
const htmlmin = require("gulp-htmlmin");
const babel = require("gulp-babel");
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);

function html() {
  return src(["src/*.html"])
    .pipe(template("src/templates/template.html"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("docs/"))
    .pipe(livereload());
}

function js() {
  return src(["src/js/*.js"])
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest("docs/js"))
    .pipe(livereload());
}

function css() {
  return src(["src/css/app.scss"])
    .pipe(sass.sync({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest("docs/css"))
    .pipe(livereload());
}

function copy() {
  return src(["src/static/**/*"]).pipe(dest("docs/")).pipe(livereload());
}

exports.watch = function () {
  livereload.listen();
  watch(["src/*.html", "src/**/*.html"], html);
  watch("src/**/*.scss", css);
  watch("src/**/*.js", js);
  watch("src/static/**/*", copy);
};

exports.build = series(html, css, js, copy);
