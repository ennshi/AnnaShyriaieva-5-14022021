const {merge} = require('webpack-merge');
const config = require('./webpack.common.config');

module.exports = merge(config, {
  mode: "production",
});
