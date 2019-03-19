const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const reportDir = './report';
const HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;

gulp.task('test', () => {
    const specsSrc = gulp.src('src/spec/*-spec.js');
    let specs;
    const toJasmine = jasmine({
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
