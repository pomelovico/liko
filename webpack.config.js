/**
 * Created by LikoLu on 2016/3/29.
 */
var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3004', // WebpackDevServer host and port
        'webpack/hot/dev-server',
        './src/js/index.js'
    ],
    devtool: "source-map",
/*    entry: {
        bundle:'./src2/js/index.js', 
        vendor: ['react']
    },*/
    output: {
        publicPath:'/public/js/',
        path: __dirname+'/public/js',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js','jsx']
    },
    module: {
        loaders:[
            // {
            //     test: [/\.js$/, /\.jsx$/],
            //     exclude: /node_modules/,
            //     loader: 'babel'
            // },
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
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        new webpack.ProvidePlugin({
            "Action": __dirname + "/src/js/actions/index.js",
            "Common": __dirname + "/src/js/constants/index.js"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'DEBUG': true
            }
        })
    ],
    watch: true
};