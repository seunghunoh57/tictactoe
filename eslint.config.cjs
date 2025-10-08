const prettier = require("eslint-config-prettier");
const globals = require("globals");
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      semi: "error",
      "no-console": "error",
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
  prettier,
]);