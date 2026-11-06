
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env) => {
  const environment =
    env === "production" ? "production" :
    env === "test" ? "test" : "development";

  const isProduction = environment === "production";

  process.env.NODE_ENV = environment;

  // Load the correct Firebase environment file
  const envFile = path.join(
    __dirname,
    `.env.${environment}`
  );

  const fileVariables = fs.existsSync(envFile)
    ? dotenv.parse(fs.readFileSync(envFile))
    : {};

  // Use file settings when available,
  // otherwise use server environment variables.
  const variables = {
    ...process.env,
    ...fileVariables
  };

  console.log("WEBPACK ENV =", environment);
  console.log("DATABASE URL =", variables.FIREBASE_DATABASE_URL);
  console.log("FIREBASE PROJECT =", variables.FIREBASE_PROJECT_ID);

  const CSSExtract = new ExtractTextPlugin("styles.css");

  return {
    entry: ["babel-polyfill", "./src/app.js"],

    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js"
    },

    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        },
        {
          test: /\.(png|jpg|ico)$/,
          exclude: /node_modules/,
          loader: "url-loader"
        }
      ]
    },

    plugins: [
      CSSExtract,

      new webpack.DefinePlugin({
        "process.env.NODE_ENV":
          JSON.stringify(environment),

        "process.env.FIREBASE_API_KEY":
          JSON.stringify(variables.FIREBASE_API_KEY),

        "process.env.FIREBASE_AUTH_DOMAIN":
          JSON.stringify(variables.FIREBASE_AUTH_DOMAIN),

        "process.env.FIREBASE_DATABASE_URL":
          JSON.stringify(variables.FIREBASE_DATABASE_URL),

        "process.env.FIREBASE_PROJECT_ID":
          JSON.stringify(variables.FIREBASE_PROJECT_ID),

        "process.env.FIREBASE_STORAGE_BUCKET":
          JSON.stringify(variables.FIREBASE_STORAGE_BUCKET),

        "process.env.FIREBASE_MESSAGING_SENDER_ID":
          JSON.stringify(variables.FIREBASE_MESSAGING_SENDER_ID),

        "process.env.FIREBASE_APP_ID":
          JSON.stringify(variables.FIREBASE_APP_ID)
      }),

      // Minify JavaScript only in production
      ...(isProduction
        ? [
            new webpack.optimize.UglifyJsPlugin({
              compress: {
                warnings: false
              },
              mangle: true,
              sourceMap: true
            })
          ]
        : [])
    ],

    devtool: isProduction ? "source-map" : "inline-source-map",

    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true,
      publicPath: "/dist/"
    }
  };
};
