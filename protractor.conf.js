const { SpecReporter } = require('jasmine-spec-reporter');
const HtmlReporter = require('protractor-beautiful-reporter');
const fs = require('fs');
const path = require('path');
const testResultsPath = './out/results';

exports.config = {
    baseUrl: '',
    specs: '../**/*.spec.ts',
    SELENIUM_PROMISE_MANAGER: false,
    directConnect: true,
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 180 * 1000,
        allScriptsTimeout: 180 * 1000,
        print: function() {
        },
    },
    params: {
        shortTimeout: 20 * 1000,
        longTimeout: 45 * 1000,
        retryAttempts: 5,
        allureScreenshotEnabled:true,
    },

    async onPrepare() {
        require('ts-node').register({
            project: require('path').join(__dirname, './tsconfig.json'),
        });

        jasmine.getEnv().addReporter(
            new SpecReporter({
                spec: {
                    displayDuration: true,
                    displayErrorMessages: true,
                    displayStacktrace: true,
                },
                summary: {
                    displayFailed: true,
                    displayErrorMessages: true,
                    displayStacktrace: true,
                },
            }));

        deleteFolderRecursively(testResultsPath);

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: testResultsPath,
        }).getJasmine2Reporter());

        await browser.waitForAngularEnabled(false);
    }
};

function deleteFolderRecursively(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach(file => {
            const curPath = path.join(dirPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursively(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dirPath);
    }
}
