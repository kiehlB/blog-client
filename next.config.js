/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    reactRoot: true,
    concurrentFeatures: true,
    serverComponents: true,
  },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ['@svgr/webpack'],
  //   });

  //   return config;
  // },
};
