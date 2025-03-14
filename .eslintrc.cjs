module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs','node_modules'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-trailing-spaces': ['error', { 'ignoreComments': true }],
    'eqeqeq': ["error", 'always'], // 要求使用 === 和 !==
    "no-unused-vars": "warn",
    "no-debugger":'off',
    "react/no-unknown-property":"warn",
    "endOfLine": "crlf"
  },
  "@typescript-eslint/naming-convention": [
    true,
    { "selector": "file", "format": ["camelCase"] }
  ]
}
