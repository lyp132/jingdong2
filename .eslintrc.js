module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭组件名称校验
    'vue/multi-word-component-names': 'off',
    // 去掉方法名和括号之间的空格，其他的不动。
    'space-before-function-paren': 0,
    'no-unused-vars': 'off'
  }
}
