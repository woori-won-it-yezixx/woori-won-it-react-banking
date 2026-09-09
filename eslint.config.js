import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]), // 빌드 결과물은 검사하지 않는다
  {
    files: ["**/*.{js,jsx}"], // 검사 대상
    extends: [
      js.configs.recommended, // 자바스크립트 기본 규칙
      reactHooks.configs.flat.recommended, // 훅 규칙
      reactRefresh.configs.vite, // Vite 전용 규칙
    ],
    languageOptions: {
      globals: globals.browser, // 브라우저에서 도는 코드다
      parserOptions: { ecmaFeatures: { jsx: true } }, // JSX 를 읽을 줄 알아야 한다
    },
  },
]);
