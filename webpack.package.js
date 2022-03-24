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
        interface: path.resolve(__dirname, "package", "interface")
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
        }
    }
});

packageConfig.module.rules[1].use.options.configFile = "tsconfig.package.json";
module.exports = packageConfig;
