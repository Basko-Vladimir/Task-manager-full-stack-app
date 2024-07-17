module.exports = {
  extends: '../.eslintrc.js',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    
    "curly": ["error", "all"],
    /**  https://eslint.org/docs/latest/rules/curly
     * Правило `curly` требует, чтобы все блоки (if, else, for, while и т.д.) были обрамлены фигурными скобками.
     * "all" указывает, что правило применяется ко всем блокам.
     * Это улучшает читаемость и предотвращает ошибки, когда к блоку добавляются новые строки кода.
     */
    
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": ["const", "let", "var"], "next": "*" },
      {
        "blankLine": "any",
        "prev": ["const", "let", "var"],
        "next": ["const", "let", "var"]
      },
      { "blankLine": "always", "prev": "*", "next": "return" }
    ],
    /**  https://eslint.org/docs/latest/rules/padding-line-between-statements
     * Правило `padding-line-between-statements` обеспечивает наличие пустых строк между определенными типами выражений.
     * 1. Пустая строка всегда добавляется после объявлений переменных (const, let, var) перед любым следующим выражением.
     * 2. Пустая строка может отсутствовать между последовательными объявлениями переменных.
     * 3. Пустая строка всегда добавляется перед выражением `return`.
     */
    
    "no-multiple-empty-lines": ["error"],
    /**  https://eslint.org/docs/latest/rules/no-multiple-empty-lines
     * Правило `no-multiple-empty-lines` запрещает использование более одной пустой строки подряд.
     * Это предотвращает чрезмерное количество пустых строк, улучшая читаемость и аккуратность кода.
     */
    
    "arrow-body-style": ["error", "as-needed"],
    /**  https://eslint.org/docs/latest/rules/arrow-body-style
     * Правило `arrow-body-style` требует, чтобы тело стрелочной функции было обрамлено фигурными скобками только тогда, когда это необходимо.
     * "as-needed" указывает, что фигурные скобки не обязательны, если функция состоит из одного выражения.
     */
    
    "prefer-arrow-callback": "off",
    /**  https://eslint.org/docs/latest/rules/prefer-arrow-callback
     * Правило `prefer-arrow-callback` предлагает использовать стрелочные функции в качестве коллбэков вместо обычных функций.
     * "off" отключает это правило, что позволяет использовать как стрелочные функции, так и обычные функции в зависимости от предпочтений разработчика.
     */
    
    "no-console": ["error", { "allow": ["warn", "error", "info"] }],
    /**  https://eslint.org/docs/latest/rules/no-console
     * Правило `no-console` запрещает использование `console.log` и других методов консоли.
     * Исключение составляют методы `console.warn`, `console.info` и `console.error`, которые разрешены.
     * Это помогает избежать случайного оставления отладочных сообщений в коде.
     */
    
    "semi": ["warn", "always"],
    /**  https://eslint.org/docs/latest/rules/no-console
     * Правило `no-console` запрещает использование `console.log` и других методов консоли.
     * Исключение составляют методы `console.warn`, `console.info` и `console.error`, которые разрешены.
     * Это помогает избежать случайного оставления отладочных сообщений в коде.
     */
    
    "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
    /**  https://eslint.org/docs/latest/rules/quotes
     * Правило `quotes` требует, чтобы строковые литералы были заключены в одинарные кавычки.
     * "single" указывает, что должны использоваться одинарные кавычки.
     * "error" означает, что любое использование других кавычек будет рассматриваться как ошибка.
     * "avoidEscape": true позволяет использовать двойные кавычки, если строка содержит одинарную кавычку и избегает экранирования.
     * "allowTemplateLiterals": true позволяет использовать шаблонные литералы (``).
     */
    
    "object-curly-spacing": ["warn", "always"],
    /**  https://eslint.org/docs/rules/object-curly-spacing
     * Это правило гарантирует правильное использование пробелов внутри фигурных скобок объектных литералов.
     * Здесь "always" указывает, что пробелы должны присутствовать внутри фигурных скобок.
     * "warn" указывает, что отсутствие пробелов будет предупреждением.
     */
    
    "no-nested-ternary": "error",
    /**  https://eslint.org/docs/rules/no-nested-ternary
     * Это правило запрещает использование вложенных тернарных операторов.
     * Нарушение этого правила считается ошибкой.
     */
    
    "import/no-useless-path-segments": "warn",
    /** https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-useless-path-segments.md
     * Это правило предотвращает использование ненужных сегментов пути в импортах.
     * Например, если вы импортируете файл из текущего каталога, использование "../" перед именем файла может быть излишним.
     * "warn" указывает, что это предупреждение, если обнаружены ненужные сегменты пути.
     */
    
    "prefer-const": "error",
    /**  https://eslint.org/docs/rules/prefer-const
     * Это правило рекомендует использовать ключевое слово const вместо let, если переменная не переназначается.
     * "error" указывает, что это ошибка, если используется let там, где может быть использован const.
     */
    
    "indent": ["error", 2],
    /**  https://eslint.org/docs/rules/indent
     * Это правило гарантирует, что отступы в вашем коде являются единообразными.
     * Здесь "2" указывает на количество пробелов для каждого уровня отступа.
     */
    
    "max-len": ["error", { "comments": 120, "code": 120 }],
    /**  https://eslint.org/docs/rules/max-len
     * Это правило устанавливает максимальную длину строки в вашем коде.
     * Здесь "comments": 120 указывает максимальную длину комментариев в 120 символов, а "code": 120 указывает максимальную длину строки кода в 120 символов.
     */
    
    "max-lines": ["warn", 300],
    /**  https://eslint.org/docs/rules/max-lines
     * Это правило устанавливает максимальное количество строк в файле.
     * "warn" указывает, что это предупреждение, если количество строк превышает установленный предел.
     */
    
    "comma-dangle": ["error", "never"],
    /**  https://eslint.org/docs/rules/comma-dangle
     * Это правило управляет наличием запятой в конце последнего свойства объекта или элемента массива.
     * Здесь "never" указывает, что запятая не должна быть добавлена в конце объекта или массива.
     */
    
    "no-debugger": "error",
    /**  https://eslint.org/docs/rules/no-debugger
     * Это правило запрещает использование ключевого слова debugger в вашем коде.
     * "error" указывает, что использование debugger считается ошибкой.
     */
    
    "no-var": "error",
    /**  https://eslint.org/docs/rules/no-var
     * Это правило запрещает использование ключевого слова var вместо let или const для объявления переменных.
     * "error" указывает, что использование var считается ошибкой.
     */
    
    "complexity": ["error", 20],
    /**  https://eslint.org/docs/rules/complexity
     * Это правило устанавливает максимальное количество путей выполнения в функции.
     * Здесь "20" указывает максимально допустимую сложность функции.
     */
    
    "eol-last": ["error", "always"],
    /**  https://eslint.org/docs/rules/eol-last
     * Это правило требует наличие пустой строки в конце файла.
     * "error" указывает, что отсутствие пустой строки считается ошибкой.
     */
    
    "import/first": "error",
    /**  https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md
     * Гарантирует, что все операторы импорта будут располагаться в начале файла до любого другого кода.
     */
    
    "import/newline-after-import": "error",
    /** https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md
     * Гарантирует, что будет добавлена пустая строка после операторов импорта.
     */
    
    "import/no-duplicates": "error",
    /** https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
     * Проверяет наличие дубликатов при импорте модулей, предотвращая случайное или избыточное дублирование.
     */
    
    "import/prefer-default-export": "off",
    /** https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
     * Отключает предпочтение использования экспорта по умолчанию в модуле.
     */
    
    "import/no-anonymous-default-export": [
      "error",
      {
        // Отключает разрешение анонимных экспортов для различных типов выражений.
        "allowArray": false,
        "allowArrowFunction": false,
        "allowAnonymousClass": false,
        "allowAnonymousFunction": false,
        // Разрешает анонимные экспорты для вызовов функций и объектов.
        "allowCallExpression": true,
        "allowLiteral": false,
        "allowObject": true
      }
    ],
    /** https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md
     * Запрещает использование анонимного экспорта по умолчанию, чтобы улучшить читаемость кода.
     */
    
    "import/no-unused-modules": "error",
    /** https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unused-modules.md
     * Проверяет, что все импортированные модули используются в проекте.
     */
    
    "import/order": [
      "error",
      {
        "groups": ["external", "builtin", "internal", "parent", "sibling", "index"],
        "newlines-between": "always"
      }
    ],
    /** https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
     * Задает порядок импортов и пустые линии между ними
     */

    "@typescript-eslint/no-unused-vars": "warn",
    /**  https://typescript-eslint.io/rules/no-unused-vars/
     * Это правило проверяет наличие неиспользуемых переменных.
     */
    
    "@typescript-eslint/no-explicit-any": "error",
    /**  https://typescript-eslint.io/rules/no-explicit-any/
     * Это правило запрещает использование явного типа "any" в коде.
     * Установлен уровень "error", что означает, что использование явного типа "any" будет считаться ошибкой.
     */
    
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "format": ["camelCase", "UPPER_CASE", "PascalCase"]
      },
      {
        "selector": "function",
        "format": ["camelCase", "PascalCase"]
      },
      {
        "selector": "class",
        "format": ["PascalCase"]
      },
      {
        "selector": "class",
        "format": ["PascalCase"]
        //"prefix": ["I"] // на усмотрение команды
      },
      {
        "selector": "typeAlias",
        "format": ["PascalCase"]
        //"prefix": ["T"] // на усмотрение команды
      },
      {
        "selector": "enum",
        "format": ["PascalCase"]
        //"prefix": ["E"] // на усмотрение команды
      }
    ],
    /**  https://typescript-eslint.io/rules/naming-convention/
     * Это правило проверяет соглашения по именованию в TypeScript.
     * В этой конфигурации установлены следующие соглашения:
     *   - Интерфейсы должны иметь имена в формате PascalCase и должны заканчиваться на "Interface".
     *   - Псевдонимы типов должны иметь имена в формате PascalCase и должны заканчиваться на "Type".
     */
    
    "@typescript-eslint/ban-types": [
      "error",
      {
        "types": {
          "{}": false,
          "[]": false
        },
        "extendDefaults": true
      }
    ]
    /**  https://typescript-eslint.io/rules/ban-types/
     * Это правило позволяет запрещать определенные типы в TypeScript.
     * В этой конфигурации разрешено использование типа "{}", "[]", который по умолчанию запрещен.
     */
  },
};
