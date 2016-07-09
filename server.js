var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    filename: "index.js",
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    headers: {"X-Custom-Header": "yes"},
    stats: {colors: true}
}).listen(3004, function (err, result) {
    if (err) console.log(err);
    console.log('Listening at localhost:3004');
});

