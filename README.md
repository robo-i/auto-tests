**Steps to follow in order to run automated tests**

1. Install Node.js
2. Download dependencies with the following command from the project root folder:
> npm ci
3. Install protractor by running:
> npm run install-protractor
4. If you want to disable headless chrome, comment out --headless in `src/config/chrome.js` file.
   Run tests with the following command from the project root folder:
> npm run e2e

Generated report can be found in `./out/report.html`
