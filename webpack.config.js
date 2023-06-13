const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const FaviconsPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
    const isProd = argv.mode === "production";
    const isDev = !isProd;

    const filename = (ext) =>
        `[name]${isProd ? ".[contenthash]" : ""}.bundle.${ext}`;

    const plugins = () => {
        const base = [
            new CleanWebpackPlugin(),
            new HtmlPlugin({ template: "./index.html" }),
            new FaviconsPlugin("./favicon.ico"),
            new MiniCssExtractPlugin({ filename: filename("css") }),
        ];

        if (isDev) {
            base.push(new ESLintPlugin());
        }
        return base;
    };
    return {
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
        devServer: {
            port: "3000",
            open: true,
            hot: true,
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: filename("js"),
        },
        plugins: plugins(),
        devtool: isDev ? "source-map" : false,
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
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
};
