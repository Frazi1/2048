const gulp = require('gulp')
const less = require('gulp-less')
const concat = require('gulp-concat')
const clean = require('gulp-clean')
const browserSync = require('browser-sync').create()
const runSequence = require('run-sequence')
const changed = require('gulp-changed')
const mainBowerFiles = require('main-bower-files')
const sourceMaps = require('gulp-sourcemaps')

const srcDir = 'src'
const outputDir = 'build'

const lessSrc = [`${srcDir}/**/*.less`]
const jsSrc = [`${srcDir}/**/*.js`]
const htmlSrc = [`${srcDir}/index.html`]

function withBrowserReload (gulpObs) {
	gulpObs
		.pipe(browserSync.reload({stream: true}))
}

gulp.task('less', () => withBrowserReload(
	gulp.src(lessSrc)
		.pipe(changed(outputDir, {extension: '.css'}))
		.pipe(less())
		.pipe(concat('styles.css'))
		.pipe(gulp.dest(outputDir))
	)
)

gulp.task('js', () => withBrowserReload(
	gulp.src(mainBowerFiles().concat(jsSrc))
		.pipe(changed(outputDir, {extension: '.js'}))
		.pipe(sourceMaps.init())
		.pipe(concat('index.js'))
		.pipe(sourceMaps.write())
		.pipe(gulp.dest(outputDir))
	)
)

gulp.task('html', () => withBrowserReload(
	gulp.src(htmlSrc)
		.pipe(changed(outputDir, {extension: '.html'}))
		.pipe(gulp.dest(outputDir))
	)
)

gulp.task('clean', () =>
	gulp.src(outputDir)
		.pipe(clean()))

gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: outputDir
		}
	})
})

gulp.task('watch', function () {
	gulp.watch(lessSrc, ['less'])
	gulp.watch(jsSrc, ['js'])
	gulp.watch(htmlSrc, ['html'])
})

gulp.task('default', ['build'])

gulp.task('build', () => runSequence('clean', ['html', 'less', 'js']))

gulp.task('serve', ['build', 'browserSync', 'watch'])