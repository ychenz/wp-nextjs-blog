// eslint-disable-next-line @typescript-eslint/no-var-requires
const withStyles = require("@webdeb/next-styles");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = withStyles({
  sass: true, // use .scss files
  modules: true, // style.(m|module).css & style.(m|module).scss for module files
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  sassLoaderOptions: {
    sassOptions: {
      includePaths: ["src/styles"] // @import 'variables'; # loads (src/styles/varialbes.scss), you got it..
    },
  },
  ignoreOrder: true, // for https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250#issuecomment-544898772
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.(css)/,
        loader: "emit-file-loader",
        options: {
          name: "dist/[path][name].[ext]",
        },
      },
      {
        test: /\.css$/,
        use: ["babel-loader", "raw-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "react-svg-loader",
            options: {
              svgo: {
                plugins: [
                  { removeViewBox: false }
                ],
              }
            }
          },
        ]
      },
    );

    // Here is the magic
    // We push our config into the resolve.modules array
    config.resolve.modules.push(path.resolve("./"));

    return config;
  },
});
