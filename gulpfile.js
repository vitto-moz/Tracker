const gulp = require('gulp')
// const imagemin = require('gulp-imagemin')
// const jimp = require("convert -help ");
const imageResize = require('gulp-image-resize');

gulp.task('default', function () {
    gulp.src('src/images/*.png')
        .pipe(imageResize({
            width : 50,
            height : 50,
            crop : false,
            upscale : false
        }))
        .pipe(gulp.dest('dist/resized/'));
});


gulp.task('images', function() {
    return gulp.src('src/images/*.png')
        .pipe(jimp({
            sizes: [
                {"height": 25},
            ]
        }))
        .pipe(gulp.dest('dist/resized/'));
});



// gulp.task('default', () =>
//     gulp.src('src/images/*')
//         .pipe(imagemin([
//             imagemin.gifsicle({interlaced: true}),
//             imagemin.jpegtran({progressive: true}),
//             imagemin.optipng({optimizationLevel: 7}),
//             imagemin.svgo({
//                 plugins: [
//                     {removeViewBox: true},
//                     {cleanupIDs: false}
//                 ]
//             })
//         ]))
//         .pipe(gulp.dest('dist/images'))
// );
