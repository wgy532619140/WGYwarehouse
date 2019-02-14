var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer"); // 前缀
var clean = require("gulp-clean-css"); // 压缩
var concat = require("gulp-concat"); // 合并
var scss = require("gulp-sass"); // 编译scss

//编译
gulp.task("Sass", function() {
    return gulp.src(['./src/scss/*.scss', '!./src/scss/_mixin.scss', '!./src/scss/common.scss'])
        .pipe(scss())
        .pipe(clean())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./src/css/'))
})

//监听
gulp.task("watch", function() {
    return gulp.watch('./src/scss/*.scss', gulp.series("Sass"))
})



gulp.task("dev", gulp.series("Sass", "watch"))