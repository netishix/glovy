const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: "source-map",
    mode: 'development',
    entry: {
        background: path.join(__dirname, './src/extension/background/index.js'),
        ['content-script']: path.join(__dirname, './src/extension/content-script/index.js'),
    },
    output: {
        filename: '[name]/index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/extension/manifest.json', to: 'manifest.json'},
            { from: 'src/extension/icons/default-icon.png', to: 'icons/default-icon.png'},
            { from: 'src/extension/icons/active-icon.png', to: 'icons/active-icon.png'},
            { from: 'src/extension/web-accessible-resources/glovy-ui.html', to: 'web-accessible-resources/glovy-ui.html'},
            { from: 'src/extension/web-accessible-resources/glovy-ui.css', to: 'web-accessible-resources/glovy-ui.css'},
        ])
    ],
};
