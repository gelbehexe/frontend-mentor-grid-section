const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = (env, argv) => {
    const mode = (argv || {}).mode || "production"
    const isDevMode = mode === "development"

    const res = {
        cache: false,
        mode: mode,
        entry: {
            main: "./src/index.js",
        },
        target: "web",

        devtool: isDevMode
            ? "inline-source-map"
            : "hidden-nosources-source-map",
        // devtool: "hidden-cheap-source-map",
        devServer: {
            static: {
                directory: "./dist",
                publicPath: "./public",
            },
        },
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.s?css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        // 'style-loader', // inline-css
                        "css-loader",
                        "resolve-url-loader",
                        "postcss-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: isDevMode
                            ? "assets/images/[name][ext]"
                            : "assets/images/[name]-[hash][ext]",
                    },
                },
                {
                    test: /\.(woff2|woff|eot|ttf|otf)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: isDevMode
                            ? "assets/fonts/[name][ext]"
                            : "assets/fonts/[name]-[hash][ext]",
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Frontend Mentor - Testimonials grid section",
                template: "./src/index.ejs",
                templateParameters: {
                    user: {
                        name: "Deborah White",
                        web: "https://codepen.io/collection/VYvGBb",
                    },
                    sourceCode:
                        "https://github.com/gelbehexe/frontend-mentor-grid-section",
                },
            }),
            new MiniCssExtractPlugin({
                filename: isDevMode
                    ? "css/[name].css"
                    : "css/[name]-[fullhash].css",
            }),
        ],
        optimization: {
            runtimeChunk: isDevMode ? "single" : false,
        },
        output: {
            filename: "js/[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
            clean: true,
        },
    }

    if (env.WEBPACK_WATCH || env["WEBPACK_SERVE"] ? "web" : "browserslist") {
        res.target = "web"
    }

    return res
}
