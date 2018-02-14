const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/index.ts')
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsp$/,
                use: 'raw-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        publicPath: path.resolve(__dirname, 'out'),
        path: path.resolve(__dirname, 'out')
    },
    devServer: {
        contentBase: __dirname,
        watchContentBase: true,
        overlay: true
    },
    plugins: [
        new DashboardPlugin()
    ]
}
