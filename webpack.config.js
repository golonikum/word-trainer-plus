// var webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
// var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// var TerserPlugin = require('terser-webpack-plugin')
// import HtmlWebpackPlugin from 'html-webpack-plugin';
const path = require('path');
const autoprefixer = require('autoprefixer');
const LiveReloadPlugin = require('webpack-livereload-plugin');

process.noDeprecation = true

const config = {
    entry: './src/client/client.js',
    output: {
        path: path.join(__dirname, 'public/assets'),
        filename: 'bundle.js',
        publicPath: '/',
        sourceMapFilename: 'bundle.map'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.css$|\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        query: {
                            modules: true,
                            importLoaders: 2,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            importLoaders: 2,
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer({ browsers: ['last 4 versions'] })]
                        }
                    },
                    { 
                        loader: 'sass-loader',
                        options: {} 
                    }
                ],
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: ["style-loader", "css-loader", {
            //             loader: "postcss-loader",
            //             options: {
            //               plugins: () => [require("autoprefixer")]
            //             }}]
            //     })
            // },
            // {
            //     test: /\.scss/,
            //     loader: ExtractTextPlugin.extract({
            //         fallback: "style-loader",
            //         use: ["css-loader",{
            //             loader: "postcss-loader",
            //             options: {
            //               plugins: () => [require("autoprefixer")]
            //             }}, "sass-loader"]
            //     })
            // }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    ],
};

module.exports = (env, argv) => {
    const mode = (env && env.NODE_ENV) === 'development' ? 'development' : 'production';

    if (mode === 'development') {
        config.devtool = 'source-map';
        config.watchOptions = {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: ['node_modules']
        };
        config.plugins.push(
            new LiveReloadPlugin()
        );
    }

    if (mode === 'production') {
        
    }

    config.mode = mode;

    return config;
};
