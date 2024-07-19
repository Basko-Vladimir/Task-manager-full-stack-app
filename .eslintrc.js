module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    }
  ],
  rules: {
    'prettier/prettier': 'off'
  }
};
