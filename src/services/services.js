const API_KEY = '?api_key=2d589fc5c5b6125adc9fe7aa880d7505';
const BASE_URL = 'https://api.themoviedb.org/3/';

const fetchTrending = async () => {
  const url = `${BASE_URL}trending/movie/week${API_KEY}&page=1`;
  const res = await fetch(url);
  return res.ok ? await res.json() : Promise.reject(new Error('Not found'));
};
const fetchSearchMovies = async (query, page) => {
  const url = `${BASE_URL}search/movie${API_KEY}&query=${query}&page=${page}`;
  const res = await fetch(url);
  return res.ok ? await res.json() : Promise.reject(new Error('Not found'));
};
const fetchMovieDetails = async movieId => {
  const url = `${BASE_URL}movie/${movieId}${API_KEY}`;
  const res = await fetch(url);
  return res.ok ? await res.json() : Promise.reject(new Error('Not found'));
};
const fetchMovieCast = async movieId => {
  const url = `${BASE_URL}movie/${movieId}/credits${API_KEY}`;
  const res = await fetch(url);
  return res.ok ? await res.json() : Promise.reject(new Error('Not found'));
};

const fetchMovieReviws = async movieId => {
  const url = `${BASE_URL}movie/${movieId}/reviews${API_KEY}`;
  const res = await fetch(url);
  return res.ok ? res.json() : Promise.reject(new Error('Not found'));
};

const API_themoviedb = {
  fetchTrending,
  fetchSearchMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviws,
};

export default API_themoviedb;
