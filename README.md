# UIKit-библиотека БГТУ «ВОЕНМЕХ» им. Д.Ф. Устинова

Этот репозиторий - образная часть UIKit-библиотеки, разработанной параллельно с дизайн-системой.

## Описание

Текущая версия является "обзорной", т.е. из нее были убраны те участи кода, которые нельзя выкладывать в открытый доступ, и остались только элементы и компоненты (кнопки, ссылки, выпадающие списки и др.).
Некоторые компоненты могут отображаться с ошибками из-за того, что некоторые компоненты были вырезаны.

UIKit-библиотека доступна через внутренний npm компании, созданный на базе [Verdaccio](https://verdaccio.org).

Компоненты разрабатывались для Vue.js 3.

## Дизайн

Дизайн проекта разработан [Дроздовой Мариной](https://www.behance.net/drozdovamarina) - https://www.behance.net/gallery/180356169/BSTU-Design-System

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Testing

```sh
npm run test:unit
```

### Lint & format

```sh
npm run lint
```

```sh
npm run lint:fix
```

```sh
npm run format
```

```sh
npm run format:fix
```

#### Type-check, lint and format

```sh
npm run check
```
