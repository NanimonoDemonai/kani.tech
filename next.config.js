const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  pageExtensions: ["tsx"],
  future: {
    webpack5: true,
  },
});
