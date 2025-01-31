const { getDefaultConfig } = require('expo/metro-config');

const defaultConfiig = getDefaultConfig(__dirname);
defaultConfiig.resolver.assetExts.push("db");
module.exports = defaultConfiig;
