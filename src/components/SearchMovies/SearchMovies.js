import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { toast } from 'react-toastify';
import API from '../../services/services';
import ResultSearch from '../../views/ResultSearch';
import Button from '../Button';
import LoaderComponent from '../Loader';
import s from './SearchMovies.module.css';

export default function MoviesSearch() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [request, setRequest] = useState('');
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setRequest(new URLSearchParams(location.search).get('query'));
  }, [location.search]);

  useEffect(() => {
    if (!request) {
      return;
    }
    const handleResultSearch = async (request, page) => {
      try {
        setShowLoader(true);
        const { results, total_results } = await API.fetchSearchMovies(
          request,
          page,
        );
        setTotal(total_results);
        if (page === 1) {
          setMovies(results);
        } else {
          setMovies(prev => [...prev, ...results]);
          scrollPage();
        }
        if (!total_results) {
          toast.error(`no movie with title ${request} found`);
        }
      } catch (error) {
        toast.error(error.message, { theme: 'colored' });
      } finally {
        setShowLoader(false);
      }
    };
    handleResultSearch(request, page);
  }, [request, page]);

  const handleChangeQuery = e => {
    setQuery(e.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    if (!query) {
      toast.error('Please, enter your request!');
      return;
    }
    setRequest(query);
    setQuery('');
    setPage(1);
    history.push({ ...location, search: `query=${query}` });
  };

  const incrementPage = () => {
    setPage(prev => prev + 1);
  };

  const scrollPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <form className={s.form} onSubmit={handleSubmitForm}>
        <input
          autoComplete="off"
          autoFocus
          placeholder="Enter movie name"
          onChange={handleChangeQuery}
          type="text"
          value={query}
          className={s.input}
        />
        <Button title="search" type="submit"></Button>
      </form>
      <div className={s.resultSearch}>
        {showLoader && <LoaderComponent />}
        <ResultSearch movies={movies} />
        {total - page * 20 > 0 && (
          <Button title="show more" func={incrementPage} type="button"></Button>
        )}
      </div>
    </>
  );
}
