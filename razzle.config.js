const path = require('path');
const packageJson = require('./package.json');
const workspaces = packageJson.workspaces;

module.exports = {
  modifyBabelOptions: () => ({
    plugins: [
      [
        'babel-plugin-styled-components',
        {
          displayName: false,
          fileName: true,
          minify: true,
          pure: true,
          ssr: true,
        },
      ],
    ],
    presets: ['razzle/babel', '@babel/preset-flow'],
  }),
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

    config.resolve.fallback = {
      fs: false,
      path: require.resolve('path-browserify'),
    };

    const jsRule = config.module.rules.find((loaderEntry) =>
      String(loaderEntry.test).includes('(js|jsx|mjs|ts|tsx)')
    );

    const babelLoader = jsRule.use.find((useEntry) =>
      useEntry.loader.includes('razzle-babel-loader')
    );

    babelLoader.options.plugins = [
      'babel-plugin-after',
      'babel-plugin-styled-components',
    ];

    babelLoader.options.presets = ['@babel/preset-flow'];

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
  modifyWebpackOptions({
    options: {
      webpackOptions, // the default options that will be used to configure webpack/ webpack loaders and plugins
    },
  }) {
    const options = webpackOptions; // stay immutable here
    options.notNodeExternalResMatch = (request) => {
      return /gsap/.test(request);
    };
    options.babelRule.include = options.babelRule.include.concat([/gsap/]);

    options.babelRule.use[0].options.plugins = [
      'babel-plugin-after',
      'babel-plugin-styled-components',
    ];

    options.babelRule.use[0].options.presets = ['@babel/preset-flow'];

    return options;
  },
  plugins: ['flow'],
  presets: ['@babel/preset-flow', 'razzle/babel'],
};
