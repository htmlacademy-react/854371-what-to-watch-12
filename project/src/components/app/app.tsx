import Main from '../../pages/main/main';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from '../../pages/sign-in/sign-in';
import Page404 from '../../pages/page-404/page-404';
import MoviePage from '../../pages/movie-page/movie-page';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import {Path} from '../../common-const';
import PrivateRoute from '../private-route/private-route';
import {AuthorizationStatus} from '../private-route/const';
import MyList from '../../pages/my-list/my-list';
import OverviewTab from '../../pages/movie-page/overview-tab';
import DetailsTab from '../../pages/movie-page/details-tab';
import ReviewTab from '../../pages/movie-page/review-tab';
import {useAppSelector} from '../../hooks';
import {selectedAllFilms, selectedLoadStatus, selectFilteredFilms} from '../../selectors';
import DisplayedCards from '../main-catalog-films/displayed-cards';
import {Loading} from '../loading/loading';

const {MainPage, Login, FilmsPages, PlayerPage, PageNotFound, MyListPage} = Path;

type AppProps = {
  filmName: string;
  yearFilm: number;
  filmGenre: string;
}

function App({filmName, yearFilm, filmGenre}: AppProps): JSX.Element {
  const filteredFilms = useAppSelector(selectFilteredFilms);
  const loadStatus = useAppSelector(selectedLoadStatus);
  const films = useAppSelector(selectedAllFilms);
  if (loadStatus) {
    return <Loading />;
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={MainPage.initial} element={<Main filmName={filmName} yearFilm={yearFilm} filmGenre={filmGenre} films={films}/>}>
            <Route path={MainPage.filmOfGenre} element={<DisplayedCards films={filteredFilms}/>}/>
          </Route>
          <Route path={Login} element={<SignIn/>}/>
          <Route path={FilmsPages.MainPage} element={<MoviePage/>}>
            <Route index element={<OverviewTab/>} />
            <Route path={FilmsPages.Tabs.Details} element={<DetailsTab/>}/>
            <Route path={FilmsPages.Tabs.Reviews} element={<ReviewTab/>}/>
          </Route>
          <Route path={`${FilmsPages.MainPage}/${FilmsPages.Review}`} element={<AddReview/>}/>
          <Route path={PlayerPage} element={<Player/>}/>
          <Route path={MyListPage} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyList films={films}/>
            </PrivateRoute>
          }
          />
          <Route path={PageNotFound} element={<Page404/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}


export default App;
