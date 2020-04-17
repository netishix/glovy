const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        ['background']: path.join(__dirname, './src/extension/background/index.js'),
        ['content-script']: path.join(__dirname, './src/extension/content-script/index.js'),
    },
    output: {
        filename: '[name]/index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin([
            { from: 'src/extension/manifest.json', to: 'manifest.json' },
            { from: 'src/extension/web-accessible-resources', to: 'web-accessible-resources' },
        ]),
    ],
};
