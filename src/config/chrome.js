const config = require('../../protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  shardTestFiles: false,
  maxInstances: 1,
  'goog:chromeOptions': {
    args: [
      // '--headless',
      '--disable-gpu',
      '--window-size=1700,1100',
      '--disable-infobars',
      '--no-sandbox',],
  },
};

exports.config = config;
