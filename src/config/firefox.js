const config = require('../../protractor.conf').config;

config.capabilities = {
  browserName: 'firefox',
  marionette: false,
  shardTestFiles: false,
  maxInstances: 1,
  'moz:firefoxOptions': {
    args: [
      '--headless',
      '-width=1500',
      '-height=1000'
    ],
  },
};

exports.config = config;
