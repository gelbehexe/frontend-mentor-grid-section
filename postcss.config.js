module.exports = {
    plugins: [
        require("postcss-preset-env")({
            stage: 1,
            features: {
                "prefers-color-scheme-query": false,
                "logical-properties-and-values": true,
            },
        }),
    ],
};
