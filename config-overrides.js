const {
  override,
  addWebpackAlias,
  addDecoratorsLegacy,
} = require("customize-cra");

const path = require("path");

module.exports = override(
  addDecoratorsLegacy(),
  //引入插件写相关配置
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
  })
);
