/** @type {import('next').NextConfig} */
module.exports = {
  module: {
    loaders: [
      {
        test: /plugin\.css$/,
        loaders: ['style-loader', 'css'],
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/v2/auth/register',
        destination: 'https://api.woongblog.xyz/api/v2/auth/register',
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
