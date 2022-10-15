const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: {
        index: './src/test.js',
        search: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    mode: 'development',
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
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jepg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            //大小小于10240字节的图片会被转换为base64放入search.html中
                            limit: 10240
                        }
                    }
                ]
            },
            {
                //处理字体
                test: /.(woff|woff2|ttf|otf|eot)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        hot: true
    }
}