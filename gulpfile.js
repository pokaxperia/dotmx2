var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var wiredep = require('wiredep').stream;
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;

/*** To Dev ***/

// Inject js and css files to index.html 
gulp.task('inject', function(){
	return gulp.src('client/index.html')
		.pipe(wiredep({
			bowerJson: require('./bower.json'),
			directory: 'bower_components',
			exclude: 'bower_components/leaflet/',
			ignorePath: '../'
		}))
		.pipe($.inject(gulp.src([
			'client/styles/styles.css'
		]), {ignorePath: '../../', relative: true}))
		.pipe($.inject(gulp.src([
			'client/*.js',
			'client/components/**/*.js'
		]), {ignorePath: '../../', relative: true}))
		.pipe(gulp.dest('client/'));
});

// Jshint to all src components
gulp.task('js', function(){
	log('Analizyng components...');

	gulp.src(['client/components/**/*.js', '!client/components/geojson/**/*.js'])
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
});
// Compile and minify sass stylesheets
gulp.task('sass', function () {
	log('Compiling sass to css');
	return gulp.src('./client/styles/**/*.scss')
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.sass({outputStyle: 'compressed'}))
		.pipe($.concat('styles.css'))
		.pipe(gulp.dest('client/styles/'));
});

/* To Production */
//gulp.task('build', ['cleaning-styles','cleaning-images','cleaning-iconfonts','cleaning-js', 'build-js', 'inject', 'templates', 'templatecache', 'json-files','build-images', 'build-iconfont']);
gulp.task('join', function(){
	log('Joining all js/css files');
	var assets = $.useref.assets({searchPath: ['./','./client']});
	var cssFilter = $.filter('**/*.css', {restore: true});
	var jsLibFilter = $.filter('**/lib.js', {restore: true});
	var jsAppFilter = $.filter('**/app.js', {restore: true});

	return gulp.src('client/index.html')
		.pipe($.inject(gulp.src(
			'tmp/templates.js',{read: false}
		),{starttag: '<!-- inject:template:js -->'}))
		.pipe(assets)
		.pipe(cssFilter)
		.pipe($.csso())
		.pipe(cssFilter.restore)
		.pipe(jsLibFilter)
		.pipe($.uglify())
		.pipe(jsLibFilter.restore)
		.pipe(jsAppFilter)
		.pipe($.ngAnnotate())
		.pipe($.uglify())
		.pipe(jsAppFilter.restore)
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe(gulp.dest('build'));
});

// Minify all HTML angular templates
gulp.task('templatecache', function(){
	log('Angularjs template files!');
	var options = {
		module: 'dotmx',
		root: 'components/'
	}
	return gulp.src('client/components/**/*.html')
		.pipe($.minifyHtml({empty: true}))
		.pipe($.angularTemplatecache(
			'templates.js',
			options
		))
		.pipe(gulp.dest('tmp'));
});
// Copy html files src -> build
gulp.task('html', function() {
	log('Copying html files');
	return gulp.src('client/components/**/*.html')
		.pipe(gulp.dest('build/components/'));
});
// Copy geojson files src -> build
gulp.task('geojson', function() {
	log('Copying json files');
	return gulp.src('client/components/**/*.geojson.js')
		.pipe(gulp.dest('build/components/'));
});
// Copy json files src -> build
gulp.task('json', function() {
	log('Copying json files');
	return gulp.src('./client/components/**/*.json')
		.pipe(gulp.dest('build/components/'));
});
// Copy images files src -> build
gulp.task('copy-images', function() {
	log('Copying images');
	return gulp.src('client/images/*.{jpg,png}')
		.pipe($.imagemin({optimizationLevel: 4}))
		.pipe(gulp.dest('build/images/'));
});
// Copy iconfonts files src -> build
gulp.task('copy-iconfont', function() {
	log('Copying iconfonts');
	return gulp.src('client/iconfonts/*.*')
		.pipe(gulp.dest('build/iconfonts/'));
});
/* Cleaners */
gulp.task('cleaning-styles', function(done){
	clean('build/styles/styles.css', done);
});
gulp.task('cleaning-components', function(done){
	clean('build/components/*.*', done);
});
gulp.task('cleaning-images', function(done){
	clean('build/images/**/*.*', done);
});
gulp.task('cleaning-iconfonts', function(done){
	clean('build/iconfonts/emus.*', done);
});
gulp.task('cleaning-js', function(done){
	clean('build/js/**/*.js', done);
});

/* Dev Server */
gulp.task('dev-server', function(){
	log('Dev server running...');

	browserSync.init({
		files: [
			"client/index.html",
			"client/images",
			"client/iconfont/*.*",
			"client/components/**/*.*",
			"client/styles/**/*.scss"
		],
		ghostMode: {
			clicks: true,
			forms: true,
			scroll: true
		},
		logFileChanges: true,
		logPrefix: "DotMx2 Project",
		notify: true,
		reloadDelay: 1500,
		server: {
			baseDir: 'client',
			routes: {
				"/bower_components": "bower_components",
				"/client": "client"
			}
		}
	});
});

/* Watch files */
gulp.task('watch', function(){
	log('Watching files!');
	gulp.watch('client/components/**/*.js', ['js']);
	gulp.watch('client/styles/**/*.scss', ['sass']);
});

// Main task
gulp.task('dev',['dev-server', 'watch']);

// Clean and log
function clean(path, done){
	log('Cleaning: '+ $.util.colors.blue(path));
	del(path, done)
}

function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.green(msg[item]));
			}
		}
	}
	else {
		$.util.log($.util.colors.green(msg));
	}
}
