export const Path = {
  MainPage: {
    initial: '/',
    filmOfGenre: ':pathGenre',
  },
  Login: '/login',
  FilmsPages: {
    MainPage: '/films/:id',
    Review: 'review',
    Tabs: {
      Overview: 'overview',
      Details: 'details',
      Reviews: 'reviews',
    }
  },
  PlayerPage: '/player/:id',
  MyListPage: '/mylist',
  PageNotFound: '*'
} as const;

export const TIME_OUT_ACTIVE_VIDEO = 1000;
export const ALL_GENRES = 'All Genres';

export const NameSpace = {
  User: 'USER',
  Api: 'API',
  Main: 'MAIN'
} as const;
