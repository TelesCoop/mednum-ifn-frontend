module.exports = {
  env: {
    browser: true,
    node: true,
  },
  root: true,
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
};
