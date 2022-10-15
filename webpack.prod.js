const path = require('path')
const webpack = require('webpack')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')


const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, '.src/*/index.js'))

    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index]
        const pageName = entryFile.match(/src\/(.*)\/index\.js/)
        console.log("pageName" ,pageName)
    })
}

module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.less$/,
                //从右往左，链式调用
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    //自动补齐CSS3前缀
                    {
                        loader: "postcss-loader"
                    },
                    //px转换为rem配置
                    {
                        loader: "px2rem-loader",
                        options: {
                            //1rem = 75px
                            remUnit: 75,
                            //rem保留多少个小数点
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|gif|jepg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            //大小小于10240字节的图片会被转换为base64放入search.html中
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            },
            {
                //处理字体
                test: /.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            //大小小于10240字节的图片会被转换为base64放入search.html中
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        //自动清理目录插件
        new CleanWebpackPlugin(),
        //CSS代码的contenthash定义
        new MiniCSSExtractPlugin({
            filename: '[name]_[contenthash].css'
        }),
        //配置HTML代码压缩插件，每个HTML文件单独配置
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: "index.html",
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: "index.html",
            chunks: ['search'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        })
    ],
    optimization: {
        minimizer: [
            new CSSMinimizerPlugin()//CSS代码压缩插件
        ]
    }
}