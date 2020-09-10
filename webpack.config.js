const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./public/index.html",
});

module.exports = {
  mode: "development",
  entry: {
    bundle: path.join(__dirname + "/src/index.tsx"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
    globalObject: "this",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", "png"],
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  module: {
    rules: [
      //tsx
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "awesome-typescript-loader",
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/i,
        loader: "file-loader",
        options: {
          outputPath: "fonts",
          name: "[name].[ext]",
        },
      },
      //images
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          outputPath: "images",
          name: "[name]-[sha1:hash:7].[ext]",
        },
      },
      //styles CSS
      {
        test: /\.(css)$/i,
        use: ["style-loader", "css-loader"],
      },
      //SASS
      {
        test: /\.(s[ca]ss)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [htmlPlugin],

  devServer: {
    // contentBase: path.join(__dirname, "build"),
    hot: true,
    // publicPath: "http://localhost:8080/public",
    historyApiFallback: true,
    port: 8080,
    compress: true,
    open: true,
  },
};
