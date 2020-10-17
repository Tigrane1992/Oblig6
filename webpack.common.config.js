const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './index.js', 
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader'],

            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader','sass-loader'],

            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader:'babel-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html',
        }),
    ],
    resolve: {
        extensions: ['.js','.jsx','.scss'],
    },
};