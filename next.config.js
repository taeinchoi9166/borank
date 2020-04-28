const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');

module.exports = withCSS(withFonts({
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });

        config.module.rules.push({
            test: /\.(png|jpg)$/,
            use: ['url-loader']
        });

        config.module.rules.push({
            test: /\.(ttf|otf)$/,
            use: ['file-loader']
        });


        return config;
    },
    devIndicators: {
        autoPrerender: false
    },
    distDir: 'build'
}));
