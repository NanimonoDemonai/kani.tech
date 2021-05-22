// MDXを読み込めるようにする
// ref: https://www.npmjs.com/package/@next/mdx
const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});
module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
  future: {
    webpack5: true,
  },
});
