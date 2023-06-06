const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const FaviconsPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        main: ["@babel/polyfill", "./index.js"],
    },
    resolve: {
        extensions: [".js"],
        alias: {
            "@": "./",
            "@core": "./core",
        },
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
    },
    plugins: [
        new HtmlPlugin({ template: "./index.html" }),
        new FaviconsPlugin("./favicon.ico"),
        new MiniCssExtractPlugin({ filename: "[name].bundle.css" }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
};
