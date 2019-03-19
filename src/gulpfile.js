const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const reporters = require('jasmine-reporters');
const reportDir = './report';
const HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;

gulp.task('test', () => {
    const specsSrc = gulp.src('spec/*-spec.js');
    let specs;
    const toJasmine = jasmine({
        configFile: 'spec/support/jasmine.json',
        reporter: new HtmlReporter({
            path: reportDir
        }),
        timeout: 30 * 1000,
    });

    specs = specsSrc.pipe(toJasmine);

    return specs.on('end', function () {
        process.exit(0);
    }).on('error', function (err) {
        console.log(err);
        process.exit(1);
    });
});

gulp.task('default', ['test']);
