const path = require("path");
// const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/"),
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js[x]?/,
        exclude: /node_modules/,
        options: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.(css)$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
