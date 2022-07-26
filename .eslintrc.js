module.exports = {
    extends: ['react-app', 'eslint:recommended', 'plugin:react/jsx-runtime'],
    plugins: ['es'],
    rules: {
        'arrow-parens': 'error',
        'es/no-dynamic-import': 'error',
        'jsx-a11y/no-access-key': 'off',
        'no-useless-escape': 'off',
        'quotes': [2, 'single'],
        'keyword-spacing': ['error', {
            'before': true,
            'after': true,
        }],
        'no-duplicate-imports': ['error', { includeExports: true }],
        'eol-last': ['error', 'always'],
        'semi': ['error', 'always'],
        'no-console': 'off',
        'no-extra-boolean-cast':'off',
        'no-extra-semi':'off',
        'no-irregular-whitespace':'off',
        'import/order': [
            'error',
            {
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                },
                'newlines-between': 'always',
                groups: [
                    'builtin',
                    ['external', 'internal'],
                    ['sibling', 'parent', 'index'],
                    'object'
                ]
            }
        ],
        'indent': ['error', 4, {
            ignoredNodes: ['TemplateLiteral'],
            SwitchCase: 1,
        }],
        'no-restricted-syntax': ['error', {
            'selector': 'VariableDeclarator[id.type=\'ObjectPattern\'] Property[key.name=\'searchParams\']',
            'message': 'URL.searchParams is not allowed, Use `query-string` package instead'
        }, {
            'selector': 'CallExpression[callee.name=\'useSelector\'] MemberExpression[object.name=\'state\']',
            'message': 'Please use a selector for any state accesses within useSelector'
        }, {
            'selector': 'CallExpression[callee.name=\'useSelector\'] VariableDeclarator[id.type=\'ObjectPattern\'][init.name=\'state\']',
            'message': 'Please use a selector for any state accesses within useSelector'
        }, {
            'selector': 'CallExpression[callee.name=\'useSelector\'] *[type=/FunctionExpression$/][params.0.type=\'ObjectPattern\']',
            'message': 'Please use a selector for any state accesses within useSelector'
        }]
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [
                    ['@ui', './src/ui'],
                    ['@store', './src/store'],
                    ['@services', './src/services'],
                    ['@near', './src/near'],
                    ['@config', './src/config'],
                    ['@utils', './src/utils'],
                ],
                extensions: ['.js', '.jsx', '.json'],
            },
        },
        'import/ignore': ['src/config/*'],
    },
    overrides: [
        {
            files: [
                'src/config/configFromEnvironment.js',
                'ci/configFromEnvironment.js',
            ],
            rules: {
                'no-process-env': ['off']
            },
        },
    ],
};
