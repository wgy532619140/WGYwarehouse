var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer"); // 前缀
var clean = require("gulp-clean-css"); // 压缩
var concat = require("gulp-concat"); // 合并
var scss = require("gulp-sass"); // 编译scss
var server = require("gulp-webserver")
var url = require("url");
var path = require("path")
var fs = require("fs")

//编译
gulp.task("Sass", function() {
    return gulp.src(['./src/scss/*.scss', '!./src/scss/_mixin.scss', '!./src/scss/common.scss'])
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(clean())
        .pipe(gulp.dest('./src/css/'))
})

//起服
gulp.task("server", function() {
    return gulp.src('./src')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                console.log(pathname);
                if (pathname === "/favicon.ico") {
                    return res.end()
                }
                pathname = pathname === "/" ? "index.html" : pathname;
                var filename = path.extname(pathname)
                if (filename) {
                    var filepath = path.join(__dirname, "src", pathname)
                    if (fs.existsSync(filepath)) {
                        res.end(fs.readFileSync(filepath))
                    }
                }
            }
        }))
})

//监听
gulp.task("watch", function() {
    return gulp.watch('./src/scss/*.scss', gulp.series("Sass"))
})



gulp.task("dev", gulp.series("Sass", "server", "watch"))