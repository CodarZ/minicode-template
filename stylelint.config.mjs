export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'block-no-empty': true,
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'import-notation': null,
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page', 'recycle-item', 'view', 'block', 'text', 'scroll-view'],
      },
    ],
    // 忽略rpx校验
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    // 渐变写法校验关闭
    'function-linear-gradient-no-nonstandard-direction': null,
    'font-family-no-missing-generic-family-keyword': null,
    // 选择器重复校验关闭
    'no-duplicate-selectors': null,
    'selector-class-pattern': null,
    // 忽略空文件校验
    'no-empty-source': null,
    // 动画函数 忽略校验
    'function-no-unknown': null,
    // 动画名 忽略校验
    'keyframes-name-pattern': null,
    'no-descending-specificity': null,
    // 不验证@未知的名字，为了兼容scss的函数
    'at-rule-no-unknown': null,
    // 禁止空注释
    'comment-no-empty': true,
  },
  ignoreFiles: [
    'docs',
    'dist',
    'public',
    'node_modules',
    'miniprogram_npm',
    '.versionrc',
    'uni_modules',
  ],
}
