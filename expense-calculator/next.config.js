// next.config.js
const path = require('path');

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'css-loader',
        {
          loader: 'sass-loader',
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [
              path.resolve(__dirname, 'src/style/media.scss'),
            ],
          },
        },
      ],
    });

    return config;
  },
};
