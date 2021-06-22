const withTM = require("next-transpile-modules")([
  "hast-util-sanitize",
  "unist-util-visit",
]);
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const removeImports = require("next-remove-imports")();

module.exports = withTM(
  withBundleAnalyzer(
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
      images: {
        domains: ["localhost:8082"],
      },
    })
  )
);
