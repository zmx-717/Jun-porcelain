import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
  { files: ["**/*.{js,mjs,cjs,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    rules: {
      // 自定义规则
      "no-console": "warn", // 警告使用 console
      "semi": ["error", "always"], // 强制使用分号
      "quotes": ["error", "double"], // 强制使用双引号
      "vue/html-indent": ["error", 2], // 强制 HTML 缩进为 2 个空格
      "vue/max-attributes-per-line": ["error", {
        "singleline": 1,
        "multiline": {
          "max": 1,
          "allowFirstLine": false
        }
      }] // 强制每行的最大属性数
      
    }
  }
];