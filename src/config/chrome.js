const config = require('../../protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  shardTestFiles: false,
  maxInstances: 1,
  'goog:chromeOptions': {
    args: [
      '--headless',
      '--disable-gpu',
      '--window-size=1500,1000',
      '--disable-infobars',
      '--no-sandbox',],
  },
};

exports.config = config;
