const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.[hash].js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        isDevelopment && new webpack.HotModuleReplacementPlugin(),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    mode: isDevelopment ? "development" : "production",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve("babel-loader"),
                        options: {
                            plugins: [
                                isDevelopment &&
                                    require.resolve("react-refresh/babel"),
                            ].filter(Boolean),
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                test: /\.module.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName:
                                    "[path]___[name]__[local]___[hash:base64:5]", // This pattern matches with the default in `babel-plugin-react-css-modules`
                            },
                        },
                    },
                ],
            },
            {
                test: /[^m][^o][^d][^u][^l][^e]\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.png|svg|jpg|gif$/,
                use: ["file-loader"],
            },
        ],
    },
};
