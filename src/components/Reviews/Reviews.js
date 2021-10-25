import { useEffect, useState } from 'react';
import API from '../../services/services';
import s from './Reviews.module.css';
import PropTypes from 'prop-types';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    API.fetchMovieReviws(movieId).then(({ results, total_pages }) => {
      if (!total_pages) {
        setError('There are no reviews here yet');
      }
      setReviews(results);
    });
  }, [movieId]);
  return (
    <ul>
      {reviews.length > 0
        ? reviews.map(({ author, id, content }) => (
            <li key={id} className={s.item}>
              <h5 className={s.author}>{`Author: ${author}`}</h5>
              <p className={s.content}>{content}</p>
            </li>
          ))
        : error}
    </ul>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};
