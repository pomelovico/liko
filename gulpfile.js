/**
 * Created by Vico on 2016.07.07.
 */
var gulp = require('gulp');
/*CSS*/
var sass = require('gulp-sass');
var csso = require('gulp-csso');

/*自动刷新*/
var livereload = require('gulp-livereload');

/*webpack打包*/
var webpack = require('gulp-webpack');

/*添加版本号*/
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var revCollector = require('gulp-rev-collector');

/*build*/
var useref = require('gulp-useref');
var filter = require('gulp-filter');

/*CSS*/
gulp.task('sass',function(){
    return gulp.src('./src/css/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(csso())
        .pipe(gulp.dest('./public/css/'))
        .pipe(livereload());
});

gulp.task('sass:watch',function(){
    livereload.listen();
    gulp.watch(['./src/css/*.scss','./index.html'],['sass']);
});

/*js打包添加版本号*/
gulp.task('webpack',function(){
    return gulp.src('./src/js/index.js')
        .pipe(webpack(require('./webpack.public.config')))
        .pipe(rev())
        .pipe(revReplace())
        .pipe(gulp.dest('./public/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./src/rev/js'))
});
gulp.task('rev',function(){
    return gulp.src(['./src/rev/**/*.json','./index.html'])
        .pipe(revCollector({replaceReved:true}))
        .pipe(useref())
        .pipe(gulp.dest('./public'))
});
gulp.task('default',function(){

});