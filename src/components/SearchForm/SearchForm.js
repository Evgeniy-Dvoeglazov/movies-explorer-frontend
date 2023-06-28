import './SearchForm.css';
import magnifier from '../../images/magnifier.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState } from 'react';

function SearchForm(props) {

  const [movieInputName, setMovieInputName] = useState('');
  const inputValueName = localStorage.getItem('movieInputName');

  function handleSubmit(e) {
    e.preventDefault();
    props.searchMovies(movieInputName);
  }

  function handleChange(e) {
    setMovieInputName(e.target.value);
  }

  return (
    <section className="searchForm">
      <form className="searchForm__field" onSubmit={handleSubmit}>
        <img className="searchForm__magnifier" src={magnifier} alt="иконка лупы" />
        <input className="searchForm__input" type="text" name="movie" placeholder="Фильм" onChange={handleChange} defaultValue={inputValueName} required />
        <button className="searchForm__button button-opacity" type="submit" aria-label="Кнопка поиска фильма"></button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
