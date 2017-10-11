var gulp            = require('gulp'),
    browserSync     = require('browser-sync').create(),
    gutil           = require('gulp-util'),
    less            = require('gulp-less'),
    imagemin        = require('gulp-imagemin'),
    autoprefixer    = require('gulp-autoprefixer'),
    rename          = require('gulp-rename'),
    livereload      = require('gulp-livereload'),
    del             = require('del'),
    nunjucks        = require('gulp-nunjucks'),
    nunjucksRender  = require('gulp-nunjucks-render'),
    browserify      = require('gulp-browserify'),
    data            = require('gulp-data')
    //dest          = require('gulp-dest')

// Fonts
gulp.task('fonts', function () {
    gutil.log(gutil.colors.green('Copying over fonts'));
    return gulp
        .src('src/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'))      
});

// Images
gulp.task('images', function () {
    gutil.log(gutil.colors.green('Optimizing Images'));
    return gulp
        .src('src/img/**/*.*')
        // minimize image file size
        //.pipe(imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest('dist/img'))      
});


// Copy over xml and txt files
gulp.task('xml', function () {
    gutil.log(gutil.colors.green('Copying XML and TXT files'));
    return gulp
        .src(['src/**/*.xml', 'src/**/*.txt'])
        // minimize image file size
        .pipe(imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest('dist'))      
});


// CSS
gulp.task('styles', function () {
    gutil.log(gutil.colors.green('Converting LESS --> CSS'));
    return gulp
        // find all .less files within directory 
        .src('src/less/main.less')
        // minify compiled less
        .pipe(less({ compress: true }))
        // add browser specific prefixes
        .pipe(autoprefixer({ browsers: ['last 2 version', '> 5%']}))
        // append file name with .min
        .pipe(rename({ suffix: '.min' })) 
        // destination folder
        .pipe(gulp.dest('dist/css'))       
}); 

// Javascript
gulp.task('scripts', function() {
    gutil.log(gutil.colors.green('Compiling and Minimizing JS'));
    return gulp.src('src/js/main.js')
        .pipe(browserify())
        .pipe(gulp.dest('dist/js'));
});


// HTML pages
gulp.task('html', function() {
    gutil.log(gutil.colors.green('Compiling HTML Templates'));
    // Gets .html and .nunjucks files in pages
    return gulp.src('src/templates/pages/*.+(html|njk)')
        
        // Adding data to Nunjucks
        .pipe(data(function() {
            return require('./src/data/events.json')
        }))
    
        // Renders template with nunjucks
        .pipe(nunjucksRender({ path: ['src/templates'] }))
        .pipe(gulp.dest('dist'))
});


gulp.task('events', function() {  
    
    var events = require('./src/data/events.json');
 
    for(var i=0; i<events.length; i++) {
        var event = events[i],fileName = event.fullName.replace(/ +/g, '-').toLowerCase();
        gutil.log("Filename: " + filename);
        
        gulp.src('pages/event-detail.njk')
            .pipe(nunjucks.compile(e))
            .pipe(rename(fileName + ".html"))
            .pipe(gulp.dest('dist/event-detail'));
    }
    
});


// Clean out destination folder prior to build
gulp.task('clean', function() {
    gutil.log(gutil.colors.green('Cleaning out destination build folder'));
    return del(['dist']);
});



// =============== Build Distribution Files ===============
// Run all tasks from the command line: `gulp`
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'fonts', 'images', 'xml', 'scripts', 'html', 'events');
});