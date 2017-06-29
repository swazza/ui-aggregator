let path = require("path"),
  fs = require("fs"),
  webpack = require("webpack");

var nodeModules = {};
fs
  .readdirSync("node_modules")
  .filter(function(x) {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = "commonjs " + mod;
  });

module.exports = function(env) {
  let config = {
    target: "node",
    entry: {
      app: path.resolve(__dirname, "../src", "index.js")
    },
    output: {
      path: path.resolve(__dirname, "../dist"),
      publicPath: "",
      filename: "[name].server.bundle.js"
    },
    externals: nodeModules,
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          use: ["babel-loader"]
        }
      ]
    }
  };

  return config;
};
