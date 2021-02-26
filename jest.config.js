const path = require('path');
let config = require('@poach/jest/config/jest/jest.config.js');

config = {
  ...config,
  setupFiles: [path.join(__dirname, 'jestSetup.js')]
}

module.exports = config
