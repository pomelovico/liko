/**
 * Created by LikoLu on 2016/3/29.
 */
var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        bundle:'./src/js/index.js',
        vendor: ['react','react-redux','redux','react-router','isomorphic-fetch','jquery','redux-thunk']
    },
    output: {
        publicPath:'/public/js/',
        path: __dirname+'/public/js',
        // filename: 'bundle.js'
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js','jsx']
    },
    module: {
        loaders:[

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel']
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'DEBUG': false
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            "Action": __dirname + "/src/js/actions/index.js",
            "Common": __dirname + "/src/js/constants/index.js"
        })
    ]
};