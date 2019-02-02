const path = require("path");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./client/app.jsx"],
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-transform-modules-amd",
              "@babel/plugin-transform-async-to-generator"
            ]
          }
        }
      }
    ]
  }
};
