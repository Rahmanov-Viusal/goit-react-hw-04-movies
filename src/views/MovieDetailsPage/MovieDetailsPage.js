import { lazy, Suspense, useEffect, useState } from 'react';
import {
  Route,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router';
import { NavLink } from 'react-router-dom';
import API from '../../services/services';
import s from './MovieDetailsPage.module.css';
import noImageAvailable from '../../components/images/Cast.11cdbeba.png';
import Button from '../../components/Button';
import LoaderComponent from '../../components/Loader';

const CastView = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: "cast-view" */),
);

const ReviewsView = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: "review-view" */),
);

export default function MovieDetailsPage(params) {
  const [moviesDetails, setMoviesDetails] = useState([]);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const { from } = location?.state || {
    from: { pathname: '/' },
  };

  useEffect(() => {
    API.fetchMovieDetails(movieId).then(setMoviesDetails);
  }, [movieId]);

  const goToBack = () => {
    history.push(location?.state?.from?.location ?? '/');
  };
  return (
    <>
      <Button
        title={location?.state?.from?.label ?? 'go to back'}
        func={goToBack}
        type="button"
      ></Button>

      <div className={s.movies}>
        <img
          src={
            moviesDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500/${moviesDetails.poster_path}`
              : noImageAvailable
          }
          alt={moviesDetails.title}
          width="250"
        />
        <div className={s.about}>
          <h1 className={s.title}>{moviesDetails.title}</h1>
          <p>user score :{moviesDetails.vote_average * 10}%</p>
          <p className={s.overview}>
            Overview
            <span className={s.description}>{moviesDetails.overview}</span>
          </p>

          <h3 className={s.title}> Genre</h3>
          <ul className={s.genre}>
            {moviesDetails.genres &&
              moviesDetails.genres.map(({ name, id }) => (
                <li key={id}>{name}</li>
              ))}
          </ul>
        </div>
      </div>
      <nav className={s.navigation}>
        <p className={s.information}>Additional information</p>
        <NavLink
          to={{
            pathname: `${url}/cast`,
            state: {
              from: from,
            },
          }}
          className={s.link}
          activeClassName={s.activeLink}
        >
          Cast
        </NavLink>

        <NavLink
          to={{
            pathname: `${url}/reviews`,
            state: {
              from: from,
            },
          }}
          className={s.link}
          activeClassName={s.activeLink}
        >
          Reviews
        </NavLink>
      </nav>
      <Suspense fallback={<LoaderComponent />}>
        <Route path={`${path}/cast`}>
          <CastView movieId={movieId} />
        </Route>
        <Route path={`${path}/reviews`}>
          <ReviewsView movieId={movieId} />
        </Route>
      </Suspense>
    </>
  );
}
