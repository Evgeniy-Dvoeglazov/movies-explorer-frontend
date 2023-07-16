import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import deleteCardBtnImage from '../../images/button-delete.svg';
import { useState, useEffect } from 'react';

function SavedMovies(props) {
  const [foundMovies, setFoundMovies] = useState([]);

  useEffect(() => {
    setFoundMovies([...props.savedMovies]);
  }, [props.savedMovies]);

  function searchMovies(movieInputName, shortMoviesActive) {
    const moviesSearch = props.savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieInputName.toLowerCase()));

    if (shortMoviesActive) {
      setFoundMovies(moviesSearch.filter(movie => movie.duration <= 40))
    } else {
      setFoundMovies(moviesSearch);
    }
  }

  return (
    <section className="savedMovies">
      <SearchForm
        searchMovies={searchMovies}
        defaultCheckbox={false}
        defaultInputValue={''}
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
