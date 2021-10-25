import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import s from './ResultSearch.module.css';
import noImageAvailable from '../../components/images/Cast.11cdbeba.png';
import PropTypes from 'prop-types';

export default function ResultSearch({ movies }) {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <ul className={s.trendItem}>
      {movies.map(({ title, id, poster_path }) => (
        <li key={id} className={s.trendMovie}>
          <Link
            to={{
              pathname: `${url}/${id}`,
              state: { from: { location, label: 'назад к поиску' } },
            }}
            className={s.trendLink}
          >
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : noImageAvailable
              }
              alt={title}
              className={s.imageTrend}
            />
            <p className={s.title}>{title}</p>
          </Link>{' '}
        </li>
      ))}
    </ul>
  );
}
ResultSearch.propTypes = {
  movies: PropTypes.array.isRequired,
};
