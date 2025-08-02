import js from "@eslint/js"
import globals from "globals"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import { fixupConfigRules } from "@eslint/compat"

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        window: "readonly",
        document: "readonly",
      },
    },
    settings: { react: { version: "18.2" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...fixupConfigRules(pluginReactConfig),
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
  {
    languageOptions: { globals: globals.browser },
  },
  js.configs.recommended,
  pluginReactConfig,
]
