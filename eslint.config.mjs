import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu(
  {
    typescript: true,
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
      },
    },
    ignores: ['docs', 'dist', 'public', 'src/libs', 'miniprogram_npm', 'node_modules'],
  },
  {
    rules: {
      'antfu/if-newline': 'off',
      'style/jsx-closing-tag-location': 'off',
      'style/eol-last': 'off',
      'import/order': 'off',
      'prefer-const': 'error',
      'node/prefer-global/process': 'off',
      'unused-imports/no-unused-vars': 'off',
      'style/semi': 'off',
      'style/indent': 'off',
      'style/quote-props': 'off',
      'style/brace-style': 'off',
      'style/arrow-parens': 'off',
      'style/indent-binary-ops': 'off',
      'style/operator-linebreak': 'off',
      'style/member-delimiter-style': 'off',
      'style/no-multiple-empty-lines': 'off',
      'no-var': 'error',
      'no-undef': 'off',
      'no-new': 'off',
      'no-param-reassign': 'error',
      'no-console': 'off',
      'no-irregular-whitespace': 'off',
      'unicorn/number-literal-case': 'off',
      'ts/ban-ts-comment': 'off',
    },
  },
)
