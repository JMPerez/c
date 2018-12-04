const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { ANALYZE } = process.env;

module.exports = {
  webpack: function(config, { dev }) {
    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true
        })
      );
    }

    // For the development version, we'll use React.
    // Because, it supports react hot loading and so on.
    if (dev) {
      return config;
    }

    return config;
  }
};
