const WindiCSSWebpackPlugin = require("windicss-webpack-plugin").default;
const path = require("path");

module.exports = {
  pageExtensions: ["tsx"],
  future: {
    webpack5: false,
  },
  webpack: (config) => {
    config.plugins.push(
      new WindiCSSWebpackPlugin({
        scan: {
          dirs: ["./"],
          exclude: ["node_modules", ".git", ".next/**/*"],
        },
      })
    );
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        "babel-loader",
        "@mdx-js/loader",
        path.join(__dirname, "./src/buildLib/fmLoader.js"),
      ],
    });
    return config;
  },
};
