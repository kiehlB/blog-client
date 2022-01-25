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
        source: '/api/v2/auth/register/:path*',
        destination: 'https://api.woongblog.xyz/:path*',
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
