module.exports = {
  extends: [
    'next/core-web-vitals',
    '../.eslintrc.js',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
    // 'prettier'
  ],
  plugins: ['react'],
  env: {
    browser: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    /**  https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
     * Это правило устанавливает позволяет не ипортировать React в каждом файле
     * для React 17 и страше
     */

    'max-lines': ['warn', 300]
    /**  https://eslint.org/docs/rules/max-lines
     * Это правило устанавливает максимальное количество строк в файле.
     * "warn" указывает, что это предупреждение, если количество строк превышает установленный предел.
     */
  }
};
