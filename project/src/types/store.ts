import {store} from '../store';
import {AuthorizationStatus} from '../components/private-route/const';
import {Film, Films} from './films';
import {LoadStatuses} from './load-statuses';
import {Comments} from './comments';
import {User} from './user';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type ValueOf<T> = T[keyof T];
export type AuthStatuses = ValueOf<typeof AuthorizationStatus>;

export type UserProcess = {
  authorizationStatus: AuthStatuses;
  user: User | null;
}

export type ApiProcess = {
  genre: string;
  allFilms: Films;
  favoriteFilms: Films;
  LoadStatus: {
    Films: LoadStatuses;
    SimilarFilms: LoadStatuses;
    Film: LoadStatuses;
    PromoFilm: LoadStatuses;
    Comments: LoadStatuses;
    PostComment: LoadStatuses;
    FavoriteFilms: LoadStatuses;
  };
  genres: string[];
  MoviePage: {
    Film: Film | null;
    PromoFilm: Film | null;
    SimilarFilms: Films | null;
    Comments: Comments | null;
  };
  error: string | null;
}
