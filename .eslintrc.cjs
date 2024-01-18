module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'next/core-web-vitals',
    ],
    ignorePatterns: ['*.cjs', '*.mjs'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
    },
};
