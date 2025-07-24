import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
      'react/react-in-jsx-scope': 'off', // Next.js no requiere React en el scope
      'no-unused-vars': 'warn', // Advertencia para variables no utilizadas
      'no-console': 'warn', // Advertencia para console.log
      '@typescript-eslint/no-explicit-any': 'off', // Permitir uso de any
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Permitir funciones sin tipos explícitos
      '@typescript-eslint/no-require-imports': 'off', // Permitir imports de módulos
      '@typescript-eslint/no-this-alias': 'off', // Permitir uso de this alias
      '@typescript-eslint/no-empty-object-type': 'off', // Permitir tipos de objeto vacíos
      '@typescript-eslint/no-wrapper-object-types': 'off', // Permitir tipos de objeto envueltos
      '@typescript-eslint/no-unsafe-function-type': 'off', // Permitir tipos de función inseguros
      '@typescript-eslint/no-unnecessary-type-constraint': 'off', // Permitir restricciones de tipo innecesarias
    },
  })
];

export default eslintConfig;
