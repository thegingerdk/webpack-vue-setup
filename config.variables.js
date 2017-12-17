module.exports = {
    path: 'public',
    src: {
        folder: 'src',
        entry: 'app.js'
    },
    js: {
        folder: 'js',
        name: "[name].js?[hash]",
    },
    css: {
        folder: 'css',
        name: "[name].css?[hash]",
    },
    scss: {
        folder: 'scss',
        variables: "global/_variables.scss"
    },
    images: {
        folder: 'images'
    },
    html: {
        folder: 'views',
        index: 'index.html',
        output: 'index.html',
        hash: true, // Cache buster
        minify: true, // Minify HTML to 1 line
    },
    providers: {
        _: 'lodash'
    },
    routes: require('./config.routes.json')
};