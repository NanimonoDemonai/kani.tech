// @ts-nocheck
require("ts-node").register({
  transpileOnly: true,
  compilerOptions: {
    module: "commonjs",
  },
});
module.exports = require("./FrontMatterLoader.ts").FMLoader;
