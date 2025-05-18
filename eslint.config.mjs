import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  tseslint.configs.recommended,
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  // block added for typescript
  {
    files : ["**/*.{js, ts}"],
    rules : {
      semi : ["error"],
      indent : ["error"]
    }
  }
]);
