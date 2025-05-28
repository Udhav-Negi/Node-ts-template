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
      "./eslint-setup/rules/find-payments" : "error", // this is the custom rule. By default it serach in the node modules
      indent : ["error"],
      "consistent-return" : ["off"]
    }
  }
]);
