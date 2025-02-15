const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Optimize Metro Bundler configuration
config.maxWorkers = 2; // Reduce number of workers
config.transformer.minifierConfig = {
  compress: false, // Disable compression during development
};

// Increase buffer size for better stability
config.server = {
  ...config.server,
  port: 8081,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Increase the response timeout
      res.setTimeout(10000);
      return middleware(req, res, next);
    };
  },
};

module.exports = config;