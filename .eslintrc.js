let config = require('@poach/core/config/eslint/eslint.core');
config = require('@poach/react/config/eslint/eslint.core')(config);
config = {
  ...config,
  env: {
    ...config.env,
    jest: true
  }
}
module.exports = config;
