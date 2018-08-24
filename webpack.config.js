const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        App: "./app/assets/scripts/App.js",
        Vendor: "./app/assets/scripts/modules/Vendor.js"
    },
    output: {
        path: path.resolve(__dirname, "./app/temp/scripts"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-env']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};