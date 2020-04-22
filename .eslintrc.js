module.exports = {
  env: {
    'browser': true
  },
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',  // Allows for the use of imports
    ecmaFeatures: {
        jsx: true,  // Allows for the parsing of JSX
    },
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['error', {
      'allowExpressions': true,
      'allowTypedFunctionExpressions': true
    }],
    "@typescript-eslint/interface-name-prefix": ["error", { 'prefixWithI': 'always' }],
    'arrow-body-style': ['error', 'as-needed', { 'requireReturnForObjectLiteral': true }],
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-extraneous-dependencies': [2, {
      devDependencies: [
        '**/test.tsx',
        '**/test.ts',
        '*.config.js'
      ]
    }],
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'indent': ['error', 2],
    'linebreak-style': 0,
    'max-len': ['error', { code: 80 }],
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'react/jsx-closing-bracket-location': [1, 'tag-aligned'],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
  },
};
