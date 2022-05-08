const TerserPlugin = require("terser-webpack-plugin");

const path = require("path");
const defaultConfig = require("./webpack.config.js");

const packageConfig = Object.assign(defaultConfig, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "package", "dist"),
        filename: "[name].js",
        library: {
            name: "interface",
            type: "umd"
        }
    },

    entry: {
        interface: path.resolve(__dirname, "package", "interface"),

        "components/LoadingScreen": path.resolve(__dirname, "package", "components", "LoadingScreen"),
        "components/Popup": path.resolve(__dirname, "package", "components", "Popup")
    },

    plugins: [],

    externals: {
        "@knownout/lib": {
            commonjs: "@knownout/lib",
            commonjs2: "@knownout/lib",
            amd: "@knownout/lib"
        },
        "react": {
            commonjs: "react",
            commonjs2: "react",
            amd: "react"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom"
        }
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false
                    }
                }
            })
        ]
    }
});

packageConfig.module.rules[1].use.options.configFile = "tsconfig.package.json";
module.exports = packageConfig;
