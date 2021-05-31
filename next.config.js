const path = require("path");

module.exports = {
  pageExtensions: ["tsx"],
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mdx$/,
      use: ["babel-loader", path.join(__dirname, "./src/buildLib/fmLoader.js")],
    });
    return config;
  },
};
