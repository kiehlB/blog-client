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

  // https://api.woongblog.xyz/api/v2/auth/register
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.woongblog.xyz/:path*gu',
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
