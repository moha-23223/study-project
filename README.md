## Локальный запуск приложения с помощью Node
В корневой папке проекта выполнить команды:

```bash
# Установить зависимости
npm i

# Запустить приложение в режиме разработки
npm run dev
```

## Материалы о библиотеке React:
- [Начало использования](https://reactdev.ru/learn/#sharing-data-between-components)
- [Использование typescript](https://reactdev.ru/learn/typescript/#typescript-with-react-components)
- [Передача параметров](https://reactdev.ru/learn/passing-props-to-a-component/)
- [Условный рендеринг](https://reactdev.ru/learn/conditional-rendering)
- [Рендеринг списков](https://reactdev.ru/learn/rendering-lists/)
- [React хуки](https://reactdev.ru/reference/react/hooks)

## Задание 1:
Реализовать компоненты из макетов в [figma](https://www.figma.com/design/GHVVL2Zuog2eYiJdDa2jBl/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B-%D0%BD%D0%B0-%D0%B2%D1%8B%D0%B1%D0%BE%D1%80?node-id=0-1&t=rjJr30FiRMDuaXAK-1):

- `src/components/dummies/Card`
- `src/components/ui/Button`
- `src/components/ui/IconButton`
- `src/components/ui/Input`
- `src/components/ui/MultiDropdown`
- `src/components/ui/Checkbox`

## Задание 2:
В этом задании необходимо:
- собрать все компоненты на одной странице [макет figma github](https://www.figma.com/design/GHVVL2Zuog2eYiJdDa2jBl/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B-%D0%BD%D0%B0-%D0%B2%D1%8B%D0%B1%D0%BE%D1%80?node-id=197-406&m=dev), [макет figma crypto](https://www.figma.com/design/GHVVL2Zuog2eYiJdDa2jBl/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%8B-%D0%BD%D0%B0-%D0%B2%D1%8B%D0%B1%D0%BE%D1%80?node-id=197-404&m=dev)
- реализовать запросы к серверу при помощи библиотеки [@tanstack/react-query](https://tanstack.com/query/latest/docs/framework/react/overview) (библиотека уже подключена в проект, нужно только добаваить несколько запросов)
    - crypto project:
        - для запроса списка монет используйте [этот эндпоинт](https://docs.coingecko.com/v3.0.1/reference/coins-list)
        - для запроса детальных данных для монеты используйте [этот эндпоинт](https://docs.coingecko.com/v3.0.1/reference/coins-id)
    - github client:
         - для запроса списка репозиториев организации используйте [этот эндпоинт](https://docs.github.com/ru/rest/repos/repos?apiVersion=2022-11-28#list-organization-repositories)
        - для запроса детальных данных для репозитория используйте [этот эндпоинт](https://docs.github.com/ru/rest/repos/repos?apiVersion=2022-11-28#get-a-repository)
- реализовать навигацию при помощи [@tanstack/router](https://tanstack.com/router/latest/docs/framework/react/overview) (библиотека уже подключена в проект, нужно только добаваить страницы)