import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import deleteCardBtnImage from '../../images/button-delete.svg';
import { useState, useEffect } from 'react';

function SavedMovies(props) {
  const [foundMovies, setFoundMovies] = useState([]);
  const shortMoviesActive = JSON.parse(localStorage.getItem('shortMoviesActive'));

  useEffect(() => {
    if (shortMoviesActive) {
      setFoundMovies(props.savedMovies.filter(movie => movie.duration <= 40));
    } else {
      setFoundMovies(props.savedMovies);
    }
  }, [props.savedMovies, shortMoviesActive]);

  function searchMovies(movieInputName, shortMoviesActive) {
    const moviesSearch = props.savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieInputName.toLowerCase()));

    if (shortMoviesActive) {
      setFoundMovies(moviesSearch.filter(movie => movie.duration <= 40))
    } else {
      setFoundMovies(moviesSearch);
    }
    localStorage.setItem('shortMoviesActive', shortMoviesActive);
  }

  return (
    <section className="savedMovies">
      <SearchForm
        searchMovies={searchMovies}
      />
      <MoviesCardList
        movies={foundMovies}
        serverError={props.serverError}
        isSavedMovie={props.isSavedMovie}
        isLoading={props.isLoading}
        onCardDelete={props.onCardDelete}
        isSaved={props.isSaved}
        buttonText={
          <img className="moviesCardList__image" src={deleteCardBtnImage} />
        }
        changeButton={false}
      />
    </section>
  );
}

export default SavedMovies;
