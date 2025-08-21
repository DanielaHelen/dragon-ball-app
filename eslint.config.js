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
    rules: {
      // React
      // Desactiva la regla que exige importar React en archivos JSX (no es necesario en React 17+)
      "react/react-in-jsx-scope": "off",
      // Desactiva la regla que exige dependencias exhaustivas en los hooks de React
      "react-hooks/exhaustive-deps": "off",
      // Desactiva la regla que exige que solo se exporten componentes en archivos con React Refresh
      "react-refresh/only-export-components": "off",
      // Permite el uso de 'any' en TypeScript (no recomienda su uso)

      // TypeScript
      "@typescript-eslint/no-explicit-any": "off",
      // Advierte si hay variables no usadas, pero ignora las que empiezan con '_'
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // Advierte sobre expresiones no usadas en TypeScript
      "@typescript-eslint/no-unused-expressions": "warn",

      // Buenas prácticas
      // exige === en lugar de ==
      "eqeqeq": "error",
      // permitimos console.log en desarrollo
      "no-console": "off",
      // alerta si declaras variables sin usar
      "no-unused-vars": "warn",

      // Estilo (alineado con Prettier)
      // comillas dobles.
      "quotes": ["error", "double"],
      // indentación de 2 espacios
      "indent": ["error", 2],
      // usar punto y coma siempre
      "semi": ["error", "always"],
    },
  },
])
