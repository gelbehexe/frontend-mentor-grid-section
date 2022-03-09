const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
    const mode = (argv || {}).mode || "production";
    const isDevMode = mode === "development";

    return {
        mode: mode,
        entry: {
            index: "./src/index.js",
        },

        devtool: isDevMode ? "inline-source-map" : false,
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
                        "postcss-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                    type: "asset/resource",
                    generator: {
                        // outputPath: 'img/',
                        filename: "assets/images/[name]-[hash][ext]",
                    },
                },
                {
                    test: /\.(woff2|woff|eot|ttf|otf)$/i,
                    type: "asset/resource",
                    generator: {
                        // outputPath: 'img/',
                        filename: "assets/fonts/[name]-[hash][ext]",
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Frontend Mentor - Testimonials grid section",
                template: "./src/index.ejs",
                templateParameters: (
                    compilation,
                    assets,
                    assetTags,
                    options
                ) => {
                    const iconTag = assetTags.headTags.find(
                        ({ tagName, attributes }) =>
                            tagName === "link" && attributes.rel === "icon"
                    );
                    if (iconTag) {
                        iconTag.attributes.type = "image/png";
                        iconTag.attributes.sizes = "32x32";
                    }

                    return {
                        compilation,
                        webpackConfig: compilation.options,
                        htmlWebpackPlugin: {
                            tags: assetTags,
                            files: assets,
                            options,
                        },
                    };
                },
                favicon: "./src/assets/images/favicon-32x32.png",
            }),
            new MiniCssExtractPlugin({
                filename: "css/[name]-[fullhash].css",
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
    };
};
