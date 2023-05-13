const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src')
}

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const fileExtension = process.env.NODE_ENV === 'production' ? 'html' : 'html';
const dataCoreFile = process.env.NODE_ENV === 'production' ? 'cleanFile' : 'dataCoreDev';

module.exports = {
    mode: mode,

    devServer: {
        open: true,
        watchFiles: ['./src/**/*']
    },

    entry: {
        main: "./src/js/main.js",
    },

    output: {
        filename: "./assets/js/[name].min.js",
        path: path.resolve(__dirname, "dist"),
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "./assets/css/[name].min.css"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: `index.${fileExtension}`,
            chunks: ['main', `${dataCoreFile}`]
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
        }),
        new CleanWebpackPlugin()
    ],

    module: {
        rules: [{
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        esModule: false,
                        sources: {
                            list: [{
                                    tag: 'source',
                                    attribute: 'src',
                                    type: 'src',
                                },
                                {
                                    tag: 'img',
                                    attribute: 'data-src',
                                    type: 'src',
                                },
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src',
                                },
                                {
                                    tag: 'source',
                                    attribute: 'srcset',
                                    type: 'srcset',
                                },
                                {
                                    tag: 'video',
                                    attribute: 'data-src',
                                    type: 'src',
                                },
                            ]
                        }
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.(pdf|svg|png|jpg|jpeg|gif|mp4)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "assets/img/",
                        esModule: false
                    }
                }
            }
        ]
    }
};