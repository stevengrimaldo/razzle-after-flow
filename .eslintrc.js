module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:flowtype/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: 'babel-eslint',
  plugins: ['flowtype', 'prettier', 'react', 'react-hooks'],
  root: true,
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        jsxBracketSameLine: false,
        overrides: [
          {
            files: '*.js',
            options: {
              parser: 'flow',
            },
          },
        ],
        parse: 'flow',
        printWidth: 80,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
      },
    ],
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/display-name': 0,
    'react/prop-types': 0,
    'sort-keys': 'error',
    'space-before-function-paren': 'error',
  },
};
