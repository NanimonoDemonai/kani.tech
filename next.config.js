const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  pageExtensions: ["tsx"],
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });

    return config;
  },
});
