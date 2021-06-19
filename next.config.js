const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const removeImports = require("next-remove-imports")();
module.exports = withBundleAnalyzer(
  removeImports({
    pageExtensions: ["tsx"],
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(graphql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      });

      return config;
    },
  })
);
