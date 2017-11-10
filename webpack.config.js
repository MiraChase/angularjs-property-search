const webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, './app');
const destPath = path.join(__dirname, './dist');

module.exports = function () {
    return {
        devtool: 'eval',
        context: sourcePath,
        entry: {
            main: sourcePath + '/app.ts',
            vendor: [
                'angular/angular.js',
                'angular-ui-router/release/angular-ui-router.js'
            ]
        },
        output: {
            path: destPath,
            filename: '[name].bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    loader: 'html-loader?exportAsEs6Default'
                },
                {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        'ng-annotate-loader',
                        'awesome-typescript-loader'
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.ts', '.html'],
            modules: [
                path.resolve(__dirname, 'node_modules'),
                sourcePath
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.bundle.js'
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            contentBase: './app',
            historyApiFallback: true,
            port: 3000,
            hot: true,
            stats: {
                warnings: true,
                colors: {
                    green: '\u001b[32m',
                }
            },
        }
    }
}
