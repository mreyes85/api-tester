// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    settings: {
      "import/core-modules": ["vue-router/auto", "vue-router/auto-routes"]
    },
    ignores: [
      'node_modules',
      'dist-electron',
      'out',
      '.gitignore',
    ],
  }
);