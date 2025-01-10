// @see https://prettier.io/docs/en/options
module.exports = {
  singleQuote: true,
  printWidth: 100,
  quoteProps: 'as-needed',
  useTabs: false,
  semi: false,
  trailingComma: 'all',
  endOfLine: 'auto',
  htmlWhitespaceSensitivity: 'strict',
  overrides: [
    {
      files: '*.wxml',
      options: { parser: 'html' },
    },
    {
      files: '*.wxss',
      options: { parser: 'css' },
    },
  ],
}
