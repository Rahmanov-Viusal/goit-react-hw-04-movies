import { useEffect, useState } from 'react';
import API from '../../services/services.js';
import s from './Cast.module.css';
import defaultPhoto from '../../components/images/Cast.11cdbeba.jpg';
import PropTypes from 'prop-types';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    API.fetchMovieCast(movieId).then(({ cast }) => {
      if (!cast.length) {
        setError('Nothing found');
      }
      setCast(cast);
    });
  }, [movieId]);

  return (
    <>
      <p>{error}</p>
      <ul className={s.cast}>
        {cast.map(({ name, id, profile_path, character }) => (
          <li key={id} className={s.castItem}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                  : defaultPhoto
              }
              alt={name}
              width="100"
              height="150"
              className={s.castImg}
            />
            <p>{name}</p>
            <p className={s.character}>
              <br />
              {character}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};
