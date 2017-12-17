const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config.variables');
const webpack = require('webpack');
const path = require('path');

const production = process.env.NODE_ENV === 'production';

const postcssConfig = {
    sourceMap: production,
    plugins: [
        require('precss'),
        require("autoprefixer"),
        require('cssnano')({preset: 'default'})
    ]
};

module.exports = {
    entry: `./${config.src.folder}/${config.src.entry}`,
    output: {
        path: path.resolve(__dirname, `./${config.path}`),
        publicPath: '/',
        filename: `${config.js.folder}/${config.js.name}`
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader', options: {sourceMap: production}
                }, {
                    loader: 'postcss-loader', options: postcssConfig
                }, {
                    loader: 'sass-loader', options: {sourceMap: production}
                }]
            })
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                postcss: postcssConfig.plugins,
                hotReload: !production,
                extractCSS: production,
                loaders: {
                    scss: ExtractTextPlugin.extract({
                        fallback: "vue-style-loader",
                        use: [{
                            loader: 'css-loader', options: {sourceMap: production}
                        }, {
                            loader: 'sass-loader', options: {sourceMap: production}
                        }, {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: `./${config.src.folder}/${config.scss.folder}/${config.scss.variables}`
                            }
                        }]
                    })
                }
            }
        }, {
            test: /\.svg$/,
            loader: 'vue-svg-loader',
            options: {
                svgo: {
                    plugins: [
                        {removeDoctype: true},
                        {removeStyleElement: true},
                        {removeScriptElement: true},
                        {removeUnusedNS: true},
                        {removeUnknownsAndDefaults: true},
                        {removeUselessStrokeAndFill: true},
                        {removeDesc: true},
                        {removeTitle: true},
                        {removeMetadata: true},
                        {removeXMLProcInst: true},
                        {cleanupAttrs: true},
                        {removeComments: true}
                    ]
                }
            }
        }, {
            test: /.*\.(gif|png|jpe?g)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 32000,
                    name: `/${config.images.folder}/[ext]s/[name].[ext]?[hash:7]`,
                }
            }]
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        }, {
            test: /\.jsx$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        contentBase: config.path,
        hot: true,
        historyApiFallback: true,
        noInfo: true,
    },
    plugins: [
        new ExtractTextPlugin({
            filename: `${config.css.folder}/${config.css.name}`,
            disable: !production,
            allChunks: true
        }),
        new webpack.ProvidePlugin(config.providers),
        new ImageminPlugin({disable: !production, test: 'images/**'}),
        new ImageminPlugin({
            disable: !production, test: 'bigpngs/**',
            optipng: {
                optimizationLevel: 9
            }
        })
    ],
    devtool: '#eval-source-map'
};

if (production) {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new CleanWebpackPlugin([path.resolve(__dirname, `./${config.path}`)]),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new HtmlWebpackPlugin({
            template: `${config.src.folder}/${config.html.folder}/${config.html.index}`,
            filename: path.resolve(__dirname, `${config.path}/${config.html.index}`),
            minify: !config.html.minify ? false : {
                collapseWhitespace: true,
                preserveLineBreaks: false,
                caseSensitive: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                quoteCharacter: '"'
            }
        }),
        new PrerenderSpaPlugin(
            path.resolve(__dirname, `./${config.path}`),
            config.routes,
            {}
        )
    ])
} else {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: `${config.src.folder}/${config.html.folder}/${config.html.index}`,
        })
    ])
}
