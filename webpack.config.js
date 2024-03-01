const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const dotEnvToParse = dotenv.config();
const libraryName = process.env.LIBRARY_NAME ? process.env.LIBRARY_NAME : "ui-library";
const externalCss = process.env.EXTERNAL_CSS === "true" ? true : false;
const externalCssName = process.env.EXTERNAL_CSS_NAME ? process.env.EXTERNAL_CSS_NAME : "index.css";

module.exports = {
  entry: "./src/components/index.js",
  externals: [],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  mode: "production",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: libraryName,
    libraryTarget: "umd",
    globalObject: "this",
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...(externalCss === true
      ? [
          new MiniCssExtractPlugin({
            filename: externalCssName,
          }),
        ]
      : []),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotEnvToParse.parsed),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          externalCss === true ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: /\.module\.\w+$/i,
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        loader: "url-loader",
        options: {
          name: "assets/fonts/[name].[ext]",
          esModule: false,
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
