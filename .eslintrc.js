module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['prettier'],
  parser: 'typescript-eslint-parser',
  plugins: ['typescript'],
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 4],
    'linebreak-style': ['error', 'unix'],
    'typescript/class-name-casing': 'error',
    'typescript/explicit-function-return-type': [
      'error',
      { allowExpressions: true }
    ],
    'typescript/member-delimiter-style': [
      'error',
      {
        delimiter: 'comma',
        requireLast: true
      }
    ],
    'typescript/no-unused-vars': 'error'
  }
}
