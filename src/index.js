import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './router';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const translationEn = {
  search: "Search",
  nothing: "Nothing was found",
  genres: "Genres",
  developers: "Developers",
  popular: "Games by popularity",
  fresh: "Freshness games",
  relevance: "Relevance",
  date: "Release date",
  choose: "Choose platform",
  releaseTitle: "Released",
  platforms: "Platforms",
  stores: "Stores",
  exceptional: "Exceptional",
  recommended: "Recommended",
  skip: "Skip",
  meh: "Meh",
  website: "Website",
  about: "About ",
  game: "game",
  count: "Count games",
  noinfo: "There is no necessary information",
  suitable: "Suitable games",
  end: "End of page"
}
const translationRu = {
  search: "Поиск",
  nothing: "Ничего не найдено",
  genres: "Жанры",
  developers: "Разработчики",
  popular: "Игры по популярности",
  fresh: "Свежие игры",
  relevance: "Популярность",
  date: "Дата выхода",
  choose: "Выберите платформу",
  releaseTitle: "Вышел:",
  platforms: "Платформы",
  stores: "Магазины",
  exceptional: "Исключительность",
  recommended: "Рекомендации",
  skip: "Пропустить",
  meh: "Так себе",
  website: "Сайт",
  about: "О ",
  game: "игре",
  count: "Количество игр",
  noinfo: "Нет необходимой информации",
  suitable: "Подходящие игры",
  end: "Конец страницы"
}

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {translation: translationEn},
      ru: {translation: translationRu}
    },
    lng: "en",
    fallbacking: 'en',
    interpolation: {escapeValue: false}
  })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);