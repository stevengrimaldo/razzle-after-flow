const path = require('path');
const packageJson = require('./package.json');
const workspaces = packageJson.workspaces;

module.exports = {
  options: {
    enableTargetBabelrc: true, // enable to use .babelrc.node and .babelrc.web
    verbose: true, // set to true to get more info/error output
  },
  modifyWebpackConfig({
    env: {
      target, // the target 'node' or 'web'
      dev, // is this a development build? true or false
    },
    webpackConfig, // the created webpack config
    paths, // the modified paths that will be used by Razzle.
  }) {
    const config = webpackConfig; // stay immutable here
    const defaultResolvePath = path.resolve('./src');
    const correctResolvePath = workspaces.map((dir) =>
      path.resolve(`${dir}/src`)
    );

    config.module.rules = config.module.rules.map((rule) => {
      if (
        Array.isArray(rule.include) &&
        rule.include.includes(defaultResolvePath)
      ) {
        rule.include = [
          ...rule.include.filter((r) => r !== defaultResolvePath),
          ...correctResolvePath,
        ];
      }

      return rule;
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@global': path.resolve('./client/src/global'),
      '@layouts': path.resolve('./client/src/layouts'),
    };

    config.resolve.fallback = {
      fs: false,
      path: require.resolve('path-browserify'),
    };

    if (target === 'node') {
      // Replace default server entry of ./src/server.js with server entry
      if (dev) {
        config.entry.server = [
          ...config.entry.server.slice(0, -1),
          path.resolve('./server/src/index.js'),
        ];
      } else {
        config.entry.server = path.resolve('./server/src/index.js');
      }
    }

    if (target === 'web') {
      // Replace default entry with client project's entry
      if (dev) {
        config.entry.client = [
          ...config.entry.client.slice(0, -1),
          path.resolve('./client/src/index.js'),
        ];
      } else {
        config.entry.client = path.resolve('./client/src/index.js');
      }
    }

    return config;
  },
};
