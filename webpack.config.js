const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const extractCSS = new ExtractTextPlugin({
    filename: 'css/style.css',
    //allChunks: true
});

const options = {
    minimize: true,
    dev: true,
}


const templates = [
    'index',
    'react',
    'demo',
];

let generateTemplates = () => {
    return templates.map(item => (
        new HtmlWebPackPlugin({
            template: `./src/pug/${item}.pug`,
            filename: `./${item}.html`,
            inject: false,
        })
    ));
}

// let generateReactTemplate = () => {
//     return [
//             new HtmlWebPackPlugin({
//             template: `./src/pug/react.html`,
//             filename: `./react.html`,
//             inject: false,
//         })
//     ]
// }

module.exports = {
    entry: {
        defer: ['./src/js/defer.js'],
        script: [
            './src/js/script.js',
            './src/scss/style.scss',
        ],
        //fontawesome: ['./src/js/fontawesome.js'],
        react: [
            './src/js/react/index.jsx',
        ]
    },
    output: {
        publicPath: '/',
        path: __dirname + '/dist',
        filename: "js/[name].min.js",
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                //test: /\.jsx?$/,
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.pug$/,
                use: [
                    "html-loader",
                    //"pug-html-loader",
                    "pug-html-loader?pretty&exports=true"
                ]
            },
            {
                test: /\.scss$/,
                use: extractCSS.extract([
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            //sourceMap: 'inline',
                            sourceMap: true,
                            plugins: function () {
                                return [
                                    require('autoprefixer')({
                                        browsers: [
                                            '> 5%',
                                            'last 100 versions',
                                            'ie 6-8'
                                        ],
                                        add: true,
                                        supports: true,
                                        flexbox: true,
                                        grid: true,
                                        cascade: true
                                    }),
                                    require('cssnano')({ preset: 'default' })
                                ]
                            }
                        }
                    }, 'sass-loader' ]
                )
            },
            {
                test: /svg\/.*\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            spriteFilename: './svg/sprite.svg',
                        }
                    }
                ]
            },
            {
                test: /fonts\/.*\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'fonts/',
                        outputPath: './css/fonts',
                    }
                }]
            },
            {
                test: /images\/.*\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000,
                            name: 'images/[name].[ext]',
                            publicPath: '../',
                        }
                    }
                ]
            }
        ]
    },
    plugins: generateTemplates()
        //.concat(generateReactTemplate())
        .concat([extractCSS])
        .concat([
        new SpriteLoaderPlugin({
            //plainSprite: true,
        }),
    ]),
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
};