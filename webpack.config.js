var path = require("path");
var glob = require("glob");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require("autoprefixer");
var CSSCombPlugin = require('csscomb-webpack-plugin');

var extractCSS = new ExtractTextPlugin("[name]");

var js_entries = {
    // {output: source}
    "js/a.js": source("src/js/a.js"),
    "js/b.js": source("src/js/b.js")
};

var css_entries = {
    // {output: source}
    "css/a.css": source("src/sass/a.scss"),
    "css/b.css": source("src/sass/b.scss")
};

module.exports = [
    // js
    function(env, argv) {
        return {
            mode: env.mode,

            entry: js_entries,

            output: {
                filename: "[name]",
                path: path.resolve(__dirname, "dist")
            }
        };
    },

    // css
    function(env, argv) {
        return {
            mode: env.mode,

            entry: css_entries,

            output: {
                filename: "[name]",
                path: path.resolve(__dirname, "dist")
            },

            module: {
                rules: [{
                    test: /\.scss$/,

                    use: extractCSS.extract({
                        use: [
                            "css-loader",
                            {
                                loader: "postcss-loader",
                                options: {
                                    plugins: [autoprefixer]
                                }
                            },
                            "sass-loader"
                        ]
                    })
                }]
            },

            plugins: [
                extractCSS,
                new CSSCombPlugin()
            ]
        };
    },

    // // compress js
    // function(env, argv) {
    //     return {
    //         mode: env.mode,

    //         entry: js_entries,

    //         output: {
    //             filename: "[name]",
    //             path: path.resolve(__dirname, "dist")
    //         }
    //     };
    // },
];

function source(src) {
    return path.resolve(__dirname, src);
}