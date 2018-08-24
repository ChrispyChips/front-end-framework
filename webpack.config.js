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
                    presets: [
                        [
                            "env",
                            {
                                "targets": {
                                    "browsers": [
                                        "last 2 versions",
                                        "safari >= 7",
                                        "ie >= 11"
                                    ]
                                }
                            }
                        ]
                    ]
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};