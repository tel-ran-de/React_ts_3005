module.exports = {
  // TODO: Переехать на новый синтаксис
  // https://eslint.org/docs/latest/use/configure/configuration-files-new
  root: true,
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
    'prettier',
    'jsdoc',
    '@idecolints',
  ],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    /*
      Общие правила
      TODO: Добавить линт для переноса на новую строку при деструктуризации объектов - если больше 3 параметром,
      то горизонтально, иначе вертикально. Если так не получится, можно сделать всегда вертикально.
      https://stash.ideco.dev/projects/UTM/repos/web-modules/pull-requests/1978/overview?commentId=211675
    */
    curly: 'error',
    // Правила для key в jsx.
    'react/jsx-key': [
      'error',
      {
        checkKeyMustBeforeSpread: true,
        checkFragmentShorthand: true,
        warnOnDuplicates: true,
      },
    ],
    /*
      Правила react: для нового синтаксиса jsx-transform нужно отключить несколько правил.
      https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
    */
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    /*
      Правила react-hooks: проставлять зависимости useEffect удобнее вручную.
    */
    'react-hooks/exhaustive-deps': 'off',
    /*
    /**
      Правила import.
      @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    */
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          // react должен быть в начале файла
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          // импорты js-ideco должны быть объединены и стоять сначала
          {
            pattern: 'js-ideco/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'import/no-anonymous-default-export': 'off',
    'import/newline-after-import': ['error'],

    /**
     * Правила для сортировки импортируемых типов/компонентов
     * внутри одного импорта .
     * @see https://eslint.org/docs/rules/sort-imports
     * */
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],

    /*
      Правила jsdoc
    */
    'jsdoc/require-param-name': ['error'],
    'jsdoc/no-types': ['error'],
    'jsdoc/empty-tags': ['error'],
    'jsdoc/check-tag-names': ['error'],
    'jsdoc/require-description-complete-sentence': ['error'],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Omit: 'Use custom type `StrictOmit` instead.',
        },
      },
    ],
    /**
     * Линт на обращение к несуществующим переменным.
     * @see https://eslint.org/docs/rules/no-undef
     */
    'no-undef': 'error',
    /**
     * Линт на неиспользуемые переменные.
     * @see https://eslint.org/docs/rules/no-unused-vars
     */
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', argsIgnorePattern: '^_' }],
    /**
     * Линт на вывод в консоль.
     * @see https://eslint.org/docs/rules/no-console
     */
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@idecolints/unique-table-ids': 'error',
  },
  // Необходимо для того, чтобы можно было не линтить обращение к React и JSX
  // правилом no-undef
  globals: {
    React: true,
    JSX: true,
  },
  overrides: [
    {
      // Правила no-undef и no-unused-vars выключены для ts файлов, так как их проверяет компилятор Тайпскрипта.
      // https://github.com/typescript-eslint/typescript-eslint/issues/2905#issuecomment-751514699
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
