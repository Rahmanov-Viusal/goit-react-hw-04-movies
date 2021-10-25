import { Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { lazy, Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Container from './components/Container';
import LoaderComponent from './components/Loader';

const NavApp = lazy(() =>
  import('./components/NavApp' /* webpackChunkName: "nav-app" */),
);

const Trending = lazy(() =>
  import('./views/Trending' /* webpackChunkName: "trending" */),
);

const SearchMovies = lazy(() =>
  import('./components/SearchMovies' /* webpackChunkName: "search-movies" */),
);

const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);

const NotFoundView = lazy(() =>
  import('./views/NotFoundView' /* webpackChunkName: "not-found-view" */),
);
function App() {
  return (
    <Container>
      <Suspense fallback={<LoaderComponent />}>
        <ToastContainer autoClose={3000} />
        <NavApp />

        <Switch>
          <Route exact path="/">
            <Trending />
          </Route>

          <Route exact path="/movies">
            <SearchMovies />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
