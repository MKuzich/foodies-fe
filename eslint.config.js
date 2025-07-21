import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginImport from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          modules: true,
          experimentalObjectRestSpread: true,
        },
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      react,
      reactHooks,
      reactRefresh,
      prettier,
      "simple-import-sort": simpleImportSort,
      "jsx-a11y": jsxA11y,
      import: eslintPluginImport,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          paths: ["resources"],
          extensions: [".js", ".jsx"],
        },
      },
    },
    rules: {
      "no-undef": "error",
      "react/jsx-uses-vars": "error",
      "no-unused-vars": ["error", { varsIgnorePattern: "^_.*$", ignoreRestSiblings: true }],
      "react/react-in-jsx-scope": "off",
      "no-duplicate-imports": "error",
      "prettier/prettier": ["error", {}, { usePrettierrc: true }],
      "react/prop-types": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/label-has-associated-control": "warn",
      "jsx-a11y/media-has-caption": "off",
      "import/no-duplicates": "error",
    },
  },
]);
