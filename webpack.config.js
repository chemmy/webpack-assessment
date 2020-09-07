const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
});

const baseConfig = {
  entry: "./src/js/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "src/js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [htmlPlugin],
};

module.exports = function (env) {
  const isDev = process.env.NODE_ENV === "development";
  console.log(`${isDev ? "Development" : "Production"} build`);

  if (isDev) {
    baseConfig.plugins.push(
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return baseConfig;
};
