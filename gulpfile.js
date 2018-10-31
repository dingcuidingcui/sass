const  gulp = require('gulp'),
        sass = require('gulp-sass'),
        rename = require('gulp-rename'),
        imagemin = require('gulp-imagemin'),
        cssnano = require('gulp-cssnano'),
        uglify = require('gulp-uglify'),
        concat = require('gulp-concat'),
        babel = require('gulp-babel');

//发布任务
//压缩sass（也就是css文件）
gulp.task('sass',function(){
    return gulp.src('./src/sass/*.scss').pipe(sass()).pipe(cssnano()).pipe(rename({'suffix' : '.min'})).pipe(gulp.dest('dist/css'));
})

//压缩图片
gulp.task('img',function(){
    return gulp.src('./src/img/*').pipe(imagemin()).pipe(gulp.dest('dist/img'));
})

//压缩js文件  （注意：如果你使用require.js文件时，就不用压缩js文件，因为require.js方法不支持压缩！）
gulp.task('js',function(){
    return gulp.src('./src/js/*.js').pipe(babel({presets: ['@babel/env']}))
        .pipe(rename({'suffix':'.min'})).pipe(uglify()).pipe(gulp.dest('dist/js'));
})


//监听任务
gulp.task('default',function(){
    gulp.watch('./src/sass/*.scss',['sass']);
    gulp.watch('./src/img/*',['img']);
    gulp.watch('./src/js/*.js',['js']);
})


