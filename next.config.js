const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  pageExtensions: ["tsx"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });

    return config;
  },
});
