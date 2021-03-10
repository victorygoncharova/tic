const devFolder = './src';
const prodFolder = './dist';

const path = {
    prod: {
        html: prodFolder,
        style: `${prodFolder}/css`,
        js: `${prodFolder}/js`,
        img: `${prodFolder}/images`,
    },
    dev: {
        html: `${devFolder}/**/*.html`,
        style: `${devFolder}/css`,
        sass: `${devFolder}/sass/style.scss`,
        js: `${devFolder}/js/**/*.js`,
        img: `${devFolder}/images/**/*`,

    },
    watch: {
        html: `${devFolder}/**/*.html`,
        sass: `${devFolder}/sass/**/*.scss`,
        js: `${devFolder}/js/**/*.js`,
        img: `${devFolder}/images/**/*.{jpg, png, svg, ico, gif, webp}`,
    }
};

const gulp = require('gulp');
const { src, dest } = gulp;
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const del = require('del');
const mode = require('gulp-mode')();
const isProd = mode.production();
const babel = require('gulp-babel');
const terser = require('gulp-terser');

// HTML

const html = () => {
    return src(path.dev.html)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(path.prod.html))
        .pipe(sync.stream())
};

// Styles

const styles = () => {
    return src(path.dev.sass)
        .pipe(plumber())
        .pipe(mode.development(sourcemap.init()))
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(mode.production(csso()))
        .pipe(mode.production(rename('style.min.css')))
        .pipe(mode.development(sourcemap.write(".")))
        .pipe(isProd ? dest(path.prod.style) : dest(path.dev.style))
        .pipe(sync.stream());
}

// Scripts

const scripts = () => {
    return src(path.dev.js)
        .pipe(mode.development(sourcemap.init()))
        .pipe(babel(
            {
                presets: ['@babel/env']
            }
        ))
        .pipe(terser())
        .pipe(mode.development(sourcemap.write(".")))
        .pipe(mode.production(rename({suffix: '.min'})))
        .pipe(mode.production(dest(path.prod.js)))
        .pipe(sync.stream());
}

// Images

const images = () => {
    return src(path.dev.img)
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.mozjpeg({quality: 90, progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(dest(path.prod.img))
}

// Server

const server = (done) => {
    sync.init({
        server: {
            baseDir: isProd ? prodFolder : devFolder
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

const reload = (done) => {
    sync.reload();
    done();
}

const copy = () => {
    return src([
        path.dev.img,], {
        base: devFolder
    })
    .pipe(dest(prodFolder));
};

const clean = () => {
    return del(prodFolder);
}

const watcher = () => {
    gulp.watch(path.watch.html, gulp.series(reload));
    gulp.watch(path.watch.sass, gulp.series(styles, reload));
    gulp.watch(path.watch.js, gulp.series(scripts, reload));
}

const build = gulp.series(clean, html, styles, scripts, images, copy, server);

exports.default = gulp.series(
    styles, scripts, server, watcher
);

exports.build = build;
