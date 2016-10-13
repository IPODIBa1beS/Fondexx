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
    //gutil = require( 'gulp-util' ),
    //ftp = require( 'vinyl-ftp'),
    //iconfont = require("gulp-iconfont"),
    //iconfontCss = require('gulp-iconfont-css'),
    dirs = {
        'source': {
            'vendorJs': './source/js/vendor/',
            'vendorCss': './source/css/vendor/',
            'js': [
                './sass/**/*.js',
                './bower_components/bootstrap-sass/assets/javascript/bootstrap.js'
            ],
            'fonts': './source/fonts/*.*',
            'fontsFolder': './source/fonts/',
            'ionicIconFont': '../bower_components/Ionicons/fonts/*',
             'html': './source/views/*.html',
            'sass': ['./source/sass/**/*.scss'],
            'img': ['./source/images/*.*'],
            'sassRoot': 'source/sass/',
            'svgIcons': './source/images/icons/*.svg',
            'pngIcons': './source/images/pngIcons/**/*.png'
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

    gulp.src(dirs.source.ionicIconFont)
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

//gulp.task( 'deploy', function () {
//
//    var conn = ftp.create( {
//        host:     'mywebsite.tld',
//        user:     'me',
//        password: 'mypass',
//        parallel: 10,
//        log:      gutil.log
//    } );
//
//    var globs = [
//        '../src/**',
//        'css/**',
//        'js/**',
//        'fonts/**',
//        'index.html'
//    ];
//
//    // using base = '.' will transfer everything to /public_html correctly
//    // turn off buffering in gulp.src for best performance
//
//    return gulp.src( globs, { base: '.', buffer: false } )
//        .pipe( conn.newer( '/public_html' ) ) // only upload newer files
//        .pipe( conn.dest( '/public_html' ) );
//
//} );

gulp.task('watch', function() {
    gulp.watch(dirs.source.sass, ['compileSass']);
    gulp.watch(dirs.source.js, ['assembleJs']);
    gulp.watch(dirs.source.img, ['images']);
});

gulp.task('default', [/*'iconfont', */ 'fonts', 'assembleJs', 'images','compileSass', 'watch']);