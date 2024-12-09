module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', "eslint-plugin-prettier"],
  ignorePatterns: ['firebase-messaging-sw.js', 'service-worker.js'],
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': 'off',
    'no-useless-escape': 'off',
    'no-empty': 'off',
    'no-prototype-builtins': 'off',
    'no-irregular-whitespace': 'off',
    'react-hooks/exhaustive-deps': 'off',
    "no-empty-pattern": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    "@typescript-eslint/no-var-requires": 'off'
  },
}