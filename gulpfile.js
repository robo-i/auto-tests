const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const reportDir = './report';
const HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;

gulp.task('test', () => {
    const specsSrc = gulp.src('src/spec/*-spec.js');
    const jasmineConfig = jasmine({
        reporter: new HtmlReporter({
            path: reportDir
        }),
        timeout: 30 * 1000,
    });

    return specsSrc.pipe(jasmineConfig);
});

gulp.task('default', ['test']);
