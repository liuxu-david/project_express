const isDev = require("../utils/judgmentDev");
const devConfig = require("./env.development");
const prodConfig = require("./env.production");

module.exports = isDev ? devConfig : prodConfig;
