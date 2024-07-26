module.exports = {
  extends: '../.eslintrc.js',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js']
};
