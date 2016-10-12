'use strict';

var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    gulpif = require('gulp-if'),
    mqpacker = require("css-mqpacker"),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    mainBowerFiles = require('main-bower-files'),
    babel = require('gulp-babel'),
    fs = require('fs'),
    //iconfont = require("gulp-iconfont"),
    //iconfontCss = require('gulp-iconfont-css'),
    dirs = {
        'source': {
            'vendorJs': './source/js/vendor/',
            'vendorCss': './source/css/vendor/',
            'js': [
                './source/blocks/*/*.js'
            ],
            'fonts': './source/fonts/*.*',
            'fontsFolder': './source/fonts/',
             'html': './source/views/*.html',
            'sass': ['./source/sass/**/*.scss'],
            'sassFolder': ['./source/sass/', './source/blocks/**/*.scss'],
            'img': ['./source/images/*.*'],
            'sassRoot': 'source/sass/',
            'svgIcons': './source/images/icons/*.svg'
        },
        'build': {
            'css': '../css/',
            'js': '../js/',
            'fonts': '../fonts/',
            'img': '../images/'
        }
    };

//fonts
gulp.task('fonts', function() {
    gulp.src(dirs.source.fonts)
        .pipe(gulp.dest(dirs.build.fonts));
});

//// icon font
//var fontname = 'svgfont';
//
//gulp.task('iconfont', function () {
//    return gulp.src([dirs.source.svgIcons])
//        .pipe(plumber())
//        .pipe(iconfontCss({
//            fontName: fontname
//            , path: './source/helpers/_svgfont.sass'
//            , targetPath: '../../' + dirs.source.sassRoot + '_svgfont.sass'
//            , fontPath: '../fonts/'
//            , cssClass: 'icon'
//        }))
//        .pipe(plumber())
//        .pipe(iconfont({
//            fontName: fontname
//            , prependUnicode: true
//            , formats: ['ttf', 'eot', 'woff']
//            , normalize: true
//            , fontHeight: 1001
//            , fontStyle: 'normal'
//            , fontWeight: 'normal'
//        }))
//        .pipe(gulp.dest(dirs.source.fontsFolder));
//});

//sass
gulp.task('compileSass', function() {

    var processors = [
        autoprefixer({browsers: ['last 2 version', 'IE 10', 'IE 11'], cascade: false}),
        mqpacker({
            sort: function (a, b) {
                a = a.replace(/\D/g, '');
                b = b.replace(/\D/g, '');
                return b - a;
            }
        })
    ];

    return gulp.src(dirs.source.sass)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle: 'compact'
        }).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dirs.build.css));
});

//js
gulp.task('assembleJs', function() {
    return gulp.src(dirs.source.js)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat("custom.js"))
        .pipe(gulp.dest(dirs.build.js));
});

//images
gulp.task('images', function() {
    return gulp.src(dirs.source.img)
        .pipe(plumber())
        .pipe(gulpif(/[.](png|jpeg|jpg|svg)$/, imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(dirs.build.img));
});

//gulp.task('assembleVendorJs', function() {
//    return gulp.src(mainBowerFiles('**/*.js'))
//        .pipe(plumber())
//        .pipe(uglify())
//        .pipe(gulp.dest(dirs.build.js));
//});
//
//gulp.task('assembleVendorCss', function() {
//    return gulp.src(mainBowerFiles('**/*.css'))
//        .pipe(plumber())
//        .pipe(gulp.dest(dirs.build.css));
//});

gulp.task('watch', function() {
    gulp.watch(dirs.source.sassFolder, ['compileSass']);
    gulp.watch(dirs.source.js, ['assembleJs']);
    gulp.watch(dirs.source.img, ['images']);
});

gulp.task('default', [/*'iconfont', */ 'fonts', 'assembleJs', 'images','compileSass', 'watch']);