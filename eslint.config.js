import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import eslintConfigPrettier from "eslint-config-prettier";


export default tseslint.config([
  // Ignora la carpeta 'dist' para que ESLint no analice archivos generados
  globalIgnores(['dist']),
  {
    // Aplica esta configuración solo a archivos TypeScript y TSX
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Usa las reglas recomendadas de ESLint para JavaScript
      js.configs.recommended,
      // Usa las reglas recomendadas para TypeScript
      tseslint.configs.recommended,
      // Usa las reglas recomendadas más recientes para los hooks de React
      reactHooks.configs['recommended-latest'],
      // Usa la configuración recomendada para React Refresh en Vite
      reactRefresh.configs.vite,
      // Usa la configuración de Prettier
      eslintConfigPrettier,
    ],
    languageOptions: {
      // Define la versión de ECMAScript a usar (2020)
      ecmaVersion: 2020,
      // Define los globals del entorno navegador
      globals: globals.browser,
    },
    plugins: {
      // Agrega el plugin de reglas para hooks de React
      "react-hooks": reactHooks,
      // Agrega el plugin para React Refresh
      "react-refresh": reactRefresh,
    },
  },
])
