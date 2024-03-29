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
import MyList from '../../pages/my-list/my-list';
import OverviewTab from '../../pages/movie-page/overview-tab';
import DetailsTab from '../../pages/movie-page/details-tab';
import ReviewTab from '../../pages/movie-page/review-tab';
import DisplayedCards from '../main-catalog-films/displayed-cards';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {selectedAuthStatus} from '../../store/user-process/selectors';
import {useEffect} from 'react';
import {AuthorizationStatus} from '../private-route/const';
import {fetchFavoriteFilms} from '../../store/async-actions';

const {MainPage, Login, FilmsPages, PlayerPage, PageNotFound, MyListPage} = Path;

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(selectedAuthStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilms());
    }
  }, [dispatch, authorizationStatus]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={MainPage.initial} element={<Main/>}>
            <Route path={MainPage.filmOfGenre} element={<DisplayedCards/>}/>
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
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyList/>
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
