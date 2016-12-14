// Gulp /plugins
var gulp           = require('gulp')

    ,browserSync   = require('browser-sync')
    ,cache         = require('gulp-cache')
    ,sourcemaps    = require('gulp-sourcemaps')
    //,debug         = require('gulp-debug')
    ,gulpif        = require('gulp-if')
    ,filter        = require('gulp-filter')

    ,del           = require('del')
    ,rename        = require('gulp-rename')
    ,concat        = require('gulp-concat')
    ,inject        = require('gulp-inject-string')

    ,sass          = require('gulp-sass')
    ,uncss         = require('gulp-uncss')
    //,postcss       = require('gulp-postcss')
    ,autoprefixer  = require('gulp-autoprefixer')
    ,cssnano       = require('gulp-cssnano')

    ,uglifyjs      = require('gulp-uglifyjs')

    ,spritesmith   = require('gulp.spritesmith')
    ,imagemin      = require('gulp-imagemin')
    ,pngquant      = require('imagemin-pngquant')
    ,imageResize   = require('gulp-image-resize')

    ,imgRetina     = require('gulp-img-retina')

    ,html5Lint      = require('gulp-html5-lint')
    //,csslint       = require('gulp-csslint')
    ,sassLint      = require('gulp-sass-lint')
    ,jshint        = require('gulp-jshint')
    ,stylish       = require('jshint-stylish')
;

// Path
var path = {
    css_libs: [
        //,'bower_components/bootstrap/dist/css/bootstrap.min.css'
        'bower_components/magnific-popup/dist/magnific-popup.css',
        'bower_components/jGrowl/jquery.jgrowl.css',
        //'bower_components/bxslider-4/dist/jquery.bxslider.min.css',
        'bower_components/slick-carousel/slick/slick.css',
        'bower_components/animate.css/animate.min.css'
        //,'bower_components/bootstrap_col_15.css'
    ],
    js_libs: [
        //'bower_components/tether/dist/js/tether.min.js'
        //,'bower_components/bootstrap/dist/js/bootstrap.min.js'
        'bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',
        'bower_components/jGrowl/jquery.jgrowl.min.js',
        //'bower_components/bxslider-4/dist/jquery.bxslider.min.jss'
        'bower_components/slick-carousel/slick/slick.min.js',
        'bower_components/wow/dist/wow.min.js',
        'bower_components/jquery.inputmask/dist/min/jquery.inputmask.bundle.min.js'
    ],
    jquery: [
        'bower_components/jquery/dist/jquery.min.js'
    ]
};

var opt = {
    dest: 2, // src(0), dist(1), smb(2)
    sassLint: 0,
    cssMin: 0
};

var site = {
    url: 'shop.afi5.ru',
    path: 'z://regru-afi5-dimdima/web/shop.afi5.ru/public_html/'
};

var dest = 'src/';
if (opt.dest == 1) dest = 'dist/';
if (opt.dest == 2) dest = site.path;

/** =======================================*/

/** sass/scss */
gulp.task('sass', function() {
    console.log(dest);
    return gulp.src('src/scss/**/*.+(sass|scss)')
        .pipe(sourcemaps.init())

        // sassLint
        .pipe(gulpif(opt.sassLint, sassLint()))
        .pipe(gulpif(opt.sassLint, sassLint.format()))

        .pipe(sass().on('error', sass.logError)) // if no interrupt
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))

        //.pipe(sourcemaps.init({loadMaps: true})) // not necessary if in 1 function
        .pipe(gulpif(opt.cssMin, cssnano({
            discardComments: {
                removeAll: true
            }
        })))

        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest + 'css'))

        //.pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream: true}));
});

/** =======================================*/

/** css-libs */
gulp.task('css-libs', function() {
    return gulp.src(path.css_libs)
        .pipe(concat('libs.css'))
        .pipe(cssnano({
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dest + 'css'));
});

/** js-libs */
gulp.task('js-libs', function() {
    return gulp.src(path.js_libs)
        .pipe(concat('libs.js'))
        .pipe(uglifyjs())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dest + 'js'));
});

/** jquery */
gulp.task('jquery', function() {
    return gulp.src(path.jquery)
        .pipe(gulp.dest(dest + 'js'));
});

/** =======================================*/

/** sprite-clean */
gulp.task('sprite-clean', function (cb) {
    del([dest + 'img/sprite-*.png'],['sprite-clean'], cb);
});

/** sprite-create */
gulp.task('sprite-create', function () {
    //var fileName = 'sprite-' + Math.random().toString().replace(/[^0-9]/g, '') + '.png';
    var fileName = 'sprite.png';

    var spriteData = gulp.src('src/sprite/*.png')
        .pipe(spritesmith({
            imgName: fileName,
            cssName: '_sprite.scss',
            cssFormat: 'scss',
            cssVarMap: function (sprite) {
                sprite.name = 'icon-' + sprite.name;
            },
            imgPath: '../img/' + fileName,
            algorithm: 'left-right',
            padding: 1
        }));

    spriteData.img
        .pipe(gulp.dest(dest + 'img'));

    spriteData.css
        .pipe(gulp.dest(dest + 'scss'));

    return spriteData;
});

/** =======================================*/

/** img */
gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true
            ,progressive: true
            ,svgoPlugins: [{removeViewBox:false}]
            ,use: [pngquant()]
        })))
        .pipe(gulp.dest(dest + 'img'));
});

/** img2 */
gulp.task('img2', function() {
    return gulp.src('src/img/**/*')
        .pipe(imageResize({
            width : 100,
            height : 100,
            crop : true,
            upscale : false
        }))
        .pipe(gulp.dest(dest + 'img'));
});

/** =======================================*/

/** browser-sync */
gulp.task('browser-sync', function() {
    if (opt.dest == 2)
        browserSync({
            proxy: site.url,
            notify: false
        });
    else
        browserSync({
            server: {
                baseDir: 'src'
            },
            notify: false
        });
});

/** =======================================*/

/** html-test */
gulp.task('html-test', function() {
    return gulp.src('src/**/*.html')
        .pipe(html5Lint());
});

/** js-test */
gulp.task('js-test', function() {
    return gulp.src(['!src/js/**/*.min.js','src/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

/** =======================================*/

/** watch */
gulp.task('watch', ['browser-sync', 'sass', 'css-libs', 'js-libs'], function() {
    gulp.watch('src/scss/**/*.+(sass|scss)', ['sass']);
    gulp.watch('src/**/*.js', browserSync.reload);
    if (opt.dest != 2) gulp.watch('src/*.html', browserSync.reload);
});

/** build */
gulp.task('build', ['clean','sass'], function(){

    var buildHtml = gulp.src('src/**/*.html')
        .pipe(inject.replace('main.css', 'main.min.css'))
        .pipe(inject.replace('main.js', 'main.min.js'))
        //.pipe(imgRetina())
        .pipe(gulp.dest('dist'));

    var buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildCss = gulp.src(['!src/css/**/*.min.css','src/css/**/*.css'])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(cssnano({
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'));

    var buildMinCss = gulp.src('src/css/**/*.min.css')
        .pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src(['!src/js/**/*.min.js','src/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(uglifyjs())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));

    var buildMinJs = gulp.src('src/js/**/*.min.js')
        .pipe(gulp.dest('dist/js'));
});

/** =======================================*/

/** clean */
gulp.task('clean', function(){
    return del.sync('dist');
});

/** clear */
gulp.task('clear', function(){
    return cache.clearAll();
});