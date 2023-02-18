# FE code guidance

- [FE code guidance](#fe-code-guidance)
- [Ground rules](#ground-rules)
  - [eslint \& prettier](#eslint--prettier)
  - [Autoformat on save](#autoformat-on-save)
- [FE code rules](#fe-code-rules)
  - [Files \& Folders Naming](#files--folders-naming)
  - [Files Architecture](#files-architecture)
  - [Imports \& Exports](#imports--exports)
    - [Imports paths](#imports-paths)
  - [process.env usage - at the constants.ts only](#processenv-usage---at-the-constantsts-only)
  - [Async](#async)
  - [Fetch](#fetch)
- [Scss rules](#scss-rules)
  - [Naming \& usage](#naming--usage)
  - [Nesting](#nesting)
  - [Styles order](#styles-order)

# Ground rules
Правила, обычно общие для проекта, и не всегда нуждающиеся в описании. Тем не менее - иногда имеет смысл записать их.

## eslint & prettier
Линтер и форматтер кода - обязательно должны быть настроены при использовании проекта. Мотивация - код будет выглядеть одинаково

## Autoformat on save
У каждого разработчика должна быть включена опция авто-форматирования по сохранению файла - это будет гарантировать применение форматтера.


# FE code rules
Правила по коду

## Files & Folders Naming

Названия файлов должны быть по следующему принципу:
- файл, содержащий компонент - должен иметь название в `PascalCase` - например: `SomeComponent.tsx`, `AnotherComponent.tsx`. Исключение - `index.tsx`
- файл, содержащий стили для одного компонента - имя должно совпадать с именем компонента, к которому предназначены эти стили. А так же - файл должен иметь расширение `.module.scss` - пример - `SomeComponent.module.scss`, `AnotherComponent.module.scss`. Исключение - `index.module.scss`
- файл, содержащий общие стили (в папке styles) - название в `kebab-case`, так же - названия рекомендуется использовать в соотв. с паттерном [7-1](https://www.learnhowtoprogram.com/user-interfaces/building-layouts-preprocessors/7-1-sass-architecture), хотя и не обязательно. Примеры: `some-styles.scss`, `another-styles.scss`
- файл, содержащий вспомогательные функции (код, без react-компонент) - следует называть в `camelCase`, например: `someHelperFunction.ts`

Названия папок:
- папки, содержащие компонент - следует называть по имени этого компонента. Если компонент `SomeComponent.tsx` - то и название папки - `SomeComponent`
- папки, содержащие папки с компонентами - название в `camelCase` - например: `components`

## Files Architecture

**TBD**

Архитектура файлов и папок проекта следующая (отображены не все файлы/папки):

```
.
├── public
│   ├── assets
│   │   ├── images
│   │   │   └── *.jpg & *.png files
│   │   ├── icons
│   │   │   └── *.svg files
│   │   └── fonts
│   │       └── <FontName>
│   │           └── font files
│   ├── favicon.ico
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├── common
│   │   │   └── <ComponentName>
│   │   │       └── ...
│   │   ├── forms
│   │   │   └── <ComponentName>
│   │   │       └── ...
│   │   ├── navigation
│   │   │   └── <any structure>
│   │   └── <pageName>
|   |       ├── <ComponentName>
│   │       │   ├── assets
│   |       |   |   └── <any structure>
|   │       │   ├── components
|   |       |   |   └── <ComponentName>
|   |       |   |       └── ...
│   │       │   ├── helpers
│   │       │   |   └── *.ts files
│   │       │   ├── ComponentName.tsx
│   │       │   └── ComponentName.module.scss
│   │       ├── index.module.scss
│   │       └── index.tsx
│   ├── styles
│   │   ├── _colors.scss
│   │   └── _light-dark-theme.scss
│   ├── helpers
│   │   ├── *.ts
│   │   └── utils.ts
│   ├── services
│   │   ├── api
│   │   │   └── *.ts
│   │   └── *.ts
│   ├── store
│   │   ├── <hookName1>Slice.ts
│   │   ├── <hookName2>Slice.ts
│   │   ├── ...
│   │   ├── hooks.ts
│   │   └── index.tsps
│   ├── translations
│   │   ├── en.js
│   │   ├── ru.js
│   │   └── index.ts
│   ├── App.module.scss
│   ├── App.tsx
│   ├── constants.ts
│   ├── index.css
│   ├── index.tsx
│   └── types.d.ts
└── ...
```

## Imports & Exports

Все импорты/экспорты следует делать через `export const`. Мотивация - всегда будет одинаковый импорт/экспорт

Исключения - подгрузка сторонних файлов - *.json или *.svg

### Imports paths

**TBD**

Для облегчения импортов - в проекте настроены следующие пути:
* `#components` = `src/components`
* `#styles` = `src/styles`
* `#helpers` = `src/helpers`
* `#services` = `src/services`
* `#store` = `src/store`

Это позволяет избавится от импортов вида `import { func } from "../../../../services/file.ts"` и писать `import { func } from "#services/file.ts"`

## process.env usage - at the constants.ts only

Переменные окружения, доступные через `process.env` должны использоваться только в файле `src/constants.ts` для получения значений и нигде больше. Мотивация - в файле констант можно указывать значения по умолчанию; более очевидная работа кода.

## Async

Вся работа с асинхронным кодом - должна происходить только с использованием `async/await`. Промисы с `.then` - не используются

## Fetch

Вся работа с запросами - должна происходить только с использованием `fetch`. В коде компонент - не должно быть явного использования `fetch`. Наиболее подходящее место для функций-запросов - `src/services/api`


# Scss rules

## Naming & usage

БЭМ - https://ru.bem.info/methodology/naming-convention/

Отдельное примечание. В соотв. с БЭМ-ом - нельзя использовать селекторы тэгов (как и сложные селекторы). Следствие - каждому элементу, который нужно стилизовать - нужно указать класс. Исключение - перебивание стилей сторонних библиотек - там допустимы более сложные селекторы.

Так же, при следовании БЭМ-у - порядок определения классов в `.scss`-файлах - должен совпадать с их порядком определения в основном файле.

## Nesting

Вложенность в scss файлах - минимальная. БЭМ уже позволяет разбивать на компоненты и грамотно их использовать. А для простоты глобального поиска - все scss-классы следует прописывать полностью (исключение - модификаторы).

Вложения - допустимы для `@media`, псевдоклассов и псевдоэлементов.

Максимальный уровень вложенности = 3.

Примеры:

```scss
.block {
  ...
}

.block__element {
  ...

  &--modification1 {}

  &--modification2 {
    ...
    @media() {}
  }

  &:hover {}

  @media() {}
}
```

## Styles order

Порядок свойств, в классе:
1. position
2. display
3. height
4. width
5. padding
6. margin
7. border
8. background-color
9. color
10. fill
11. font
12. transition/animation

При этом, порядок следует понимать не буквально. Например, к `display` - относится не только `display: flex`, но и остальные flex-св-ва, такие как: `justify-content`, `align-items`, `gap` и т.д.
