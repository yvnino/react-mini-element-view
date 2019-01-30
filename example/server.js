/* eslint-disable */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

const port = process.env.npm_package_config_port || 3000;
const host = process.env.npm_package_config_host || 'localhost';
const appEnv = process.env.NODE_ENV || 'dev';
const isProduction = appEnv == 'prod';


var compailer, config;

if (isProduction)
{
    compailer = webpack(prodConfig);
    config = prodConfig;
} 
else
{
    compailer = webpack(devConfig);
    config = devConfig;
}

new WebpackDevServer(compailer, {
    publicPath: config.output.publicPath,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' },
    historyApiFallback: true,
    progress: true,
    stats: {
        colors: true,
        chunks: false,
        'errors-only': true
    }
}).listen(port, host, function (err) {
    if (err) {
        console.log(err);
    }

    console.log(`Listening at http://${host}:${port}/`);
});