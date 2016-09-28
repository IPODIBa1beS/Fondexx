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
    dirs = {
        'source': {
            'vendorJs': './source/js/vendor/',
            'vendorCss': './source/css/vendor/',
            'js': [
                './source/js/tab.js',
                './source/js/slider.js',
                './source/js/caroucel.js',
                './source/js/index.js'
            ],
            'fonts': './source/fonts/',
             'html': './source/views/*.html',
            'sass': ['./source/sass/**/*.scss'],
            'sassFolder': './source/sass/',
            'img': './source/images/*.*'
        },
        'build': {
            'css': '../css/',
            'js': './build/assets/js/',
            'fonts': './build/assets/fonts/',
            'build': './build',
            'img': './/build/assets/images/'
        }
    };

//fonts
gulp.task('fonts', function() {
    gulp.src(dirs.source.fonts)
        .pipe(gulp.dest(dirs.build.fonts));
});

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
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat("index.js"))
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

gulp.task('assembleVendorJs', function() {
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(dirs.build.js));
});

gulp.task('assembleVendorCss', function() {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(plumber())
        .pipe(gulp.dest(dirs.build.css));
});

gulp.task('watch', function() {
    gulp.watch(dirs.source.sass, ['compileSass']);
    gulp.watch(dirs.source.js, ['assembleJs']);
    gulp.watch(dirs.source.img, ['images']);
});

gulp.task('default', ['fonts', 'assembleJs', 'images','compileSass', 'watch']);