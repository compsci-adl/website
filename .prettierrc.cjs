/**
 * @type {import('prettier').Config &
 *     import('prettier-plugin-tailwindcss').PluginOptions &
 *     import('@trivago/prettier-plugin-sort-imports').PluginConfig &
 *     import('prettier-plugin-jsdoc').Options}
 */
module.exports = {
    plugins: [
        '@trivago/prettier-plugin-sort-imports',
        'prettier-plugin-jsdoc',
        'prettier-plugin-tailwindcss',
    ],
    trailingComma: 'es5',
    bracketSpacing: true,
    bracketSameLine: false,
    singleQuote: true,
    quoteProps: 'as-needed',
    arrowParens: 'always',
    useTabs: false,
    tabWidth: 4,
    printWidth: 100,
    semi: true,
    requirePragma: false,
    insertPragma: false,
    proseWrap: 'preserve',
    endOfLine: 'lf',
    jsxSingleQuote: false,
    singleAttributePerLine: false,
    htmlWhitespaceSensitivity: 'css',
    embeddedLanguageFormatting: 'auto',
    importOrderSeparation: false,
    importOrder: ['<THIRD_PARTY_MODULES>', '^[./]', '<THIRD_PARTY_TYPES>', '<TYPE>^[./]'],
    overrides: [
        {
            files: ['*.yaml', '*.yml', '*.json', '*.config.{js,ts}', '*rc', '*rc.{js,ts}'],
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '*.html',
            options: {
                singleQuote: false,
            },
        },
    ],
};
