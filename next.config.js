// MDXを読み込めるようにする
// ref: https://www.npmjs.com/package/@next/mdx
const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});
const WindiCSSWebpackPlugin = require("windicss-webpack-plugin").default;

module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
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
    return config;
  },
});
