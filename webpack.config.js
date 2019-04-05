// var webpack = require("webpack")
// var ExtractTextPlugin = require("extract-text-webpack-plugin")
// var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
// var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// var TerserPlugin = require('terser-webpack-plugin')
// import HtmlWebpackPlugin from 'html-webpack-plugin';
var path = require("path")
var LiveReloadPlugin = require('webpack-livereload-plugin')

process.noDeprecation = true

var config = {
    entry: './src/client/client.js',
    output: {
        path: path.join(__dirname, 'public/assets'),
        filename: 'bundle.js',
        publicPath: 'assets',
        sourceMapFilename: 'bundle.map'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
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
    plugins: [],
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
