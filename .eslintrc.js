module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module"
  },
  plugins: ["vue", "html", "prettier"],
  rules: {
    "vue/multi-word-component-names": 0,
    "prettier/prettier": "error"
  }
}
