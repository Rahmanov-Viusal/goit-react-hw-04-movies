import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './Trending.module.css';
import noImageAvailable from '../../components/images/Cast.11cdbeba.png';
import API_themoviedb from '../../services/services';

function Trending(props) {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    API_themoviedb.fetchTrending().then(data => setMovies(data.results));
  }, []);

  return (
    <div>
      <h1 className={s.trendTitle}>Trending to week</h1>

      <ul className={s.trendList}>
        {movies.map(({ id, title, poster_path }) => (
          <li className={s.trendItem} key={id}>
            <Link
              className={s.trendLink}
              to={{
                pathname: `movies/${id}`,
                state: { from: { location, label: 'назад к трендам' } },
              }}
            >
              <img
                className={s.imageTrend}
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500//${poster_path}`
                    : noImageAvailable
                }
                alt={title}
              />
              <p className={s.title}>{title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trending;
