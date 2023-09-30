const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';

module.exports = {
    mode,
    devServer: {
        port: 4200,
        open: true,
        hot: true,
    },
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: "[name].[contenthash].js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new HtmlWebpackPlugin({
            filename: "order.html",
            template: path.resolve(__dirname, 'src', 'order.html'),
        }),
        new HtmlWebpackPlugin({
            filename: "catalog.html",
            template: path.resolve(__dirname, 'src', 'catalog.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    resolve: {
        alias: {
            Styles: path.resolve(__dirname, './src/styles')
        },
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: '@import "Styles/variables.scss"; @import "Styles/mixins/mixin-adaptive.scss";',
                        },
                    },
                ],
            },
            {
                test: /\.woff2?$/i,
                type: "asset/resource",
            },
        ],
    },
};