const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const extractCSS = new ExtractTextPlugin({
    filename: 'css/style.css',
});

const options = {
    minimize: true,
    dev: true,
}


const templates = [
    'index',
    'test',
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

module.exports = {
    entry: {
        defer: ['./src/js/defer.js'],
        script: [
            './src/js/script.js',
            './src/scss/style.scss',
        ],
        fontawesome: ['./src/js/fontawesome.js']
    },
    output: {
        publicPath: '/',
        path: __dirname + '/dist',
        filename: "js/[name].min.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
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
                    "pug-html-loader?pretty&exports=false"
                ]
            },
            {
                test: /\.scss$/,
                use: extractCSS.extract(['css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: 'inline',
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
                            ]
                        }
                    }
                }, 'sass-loader' ])
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
        .concat([extractCSS])
        .concat([
        new SpriteLoaderPlugin({
            //plainSprite: true,
        }),
    ])
};