var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    reactify = require('reactify');
 
gulp.task('server-render', doBundle.bind(this, './www/'));

function doBundle(outPath) {
    var bundler = browserify({
        entries: ['./src/client/app.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });    
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest(outPath));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .on('error', function() {
        console.log('Err')
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest(outPath));
}

// Just running the two tasks
gulp.task('default', ['server-render']);