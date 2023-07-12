import './SearchForm.css';
import magnifier from '../../images/magnifier.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState, useEffect } from 'react';

function SearchForm(props) {

  const [movieInputName, setMovieInputName] = useState('');
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);
  const inputValueName = localStorage.getItem('movieInputName');

  useEffect(() => {
    setMovieInputName(inputValueName);
    setIsCheckboxActive(JSON.parse(localStorage.getItem('shortMoviesActive')));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    props.searchMovies(movieInputName, isCheckboxActive);
  }

  function handleChange(e) {
    setMovieInputName(e.target.value);
  }

  function handleSwitchCheckbox(shortMovieChange) {
    setIsCheckboxActive(shortMovieChange);
    props.searchMovies(movieInputName, shortMovieChange);
  }

  return (
    <section className="searchForm">
      <form className="searchForm__field" onSubmit={handleSubmit}>
        <img className="searchForm__magnifier" src={magnifier} alt="иконка лупы" />
        <input className="searchForm__input" type="text" name="movie" placeholder="Фильм" onChange={handleChange} value={movieInputName} required />
        <button className="searchForm__button button-opacity" type="submit" aria-label="Кнопка поиска фильма"></button>
      </form>
      <FilterCheckbox
        searchMovies={props.searchMovies}
        movieInputName={movieInputName}
        handleSwitchCheckbox={handleSwitchCheckbox}
        isCheckboxActive={isCheckboxActive}
      />
    </section>
  );
}

export default SearchForm;
