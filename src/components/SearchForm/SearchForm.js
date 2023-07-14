import './SearchForm.css';
import magnifier from '../../images/magnifier.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

function SearchForm(props) {

  const [movieInputName, setMovieInputName] = useState('');
  const [isCheckboxActive, setIsCheckboxActive] = useState(false);
  const inputValueName = localStorage.getItem('movieInputName');

  const { register, formState: { errors, isValid }, getValues, setValue } = useForm({ mode: 'onChange', criteriaMode: 'all' });

  const errorClassname = (name) => `searchForm__error ${errors[name] ? 'searchForm__error_visible' : ''}`;

  useEffect(() => {
    setIsCheckboxActive(JSON.parse(localStorage.getItem('shortMoviesActive')));
    setValue('movie', inputValueName);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    props.searchMovies(getValues('movie'), isCheckboxActive);
  }

  function handleChange() {
    setMovieInputName(getValues('movie'));
  }

  function handleSwitchCheckbox(shortMovieChange) {
    setIsCheckboxActive(shortMovieChange);
    props.searchMovies(getValues('movie'), shortMovieChange);
  }

  return (
    <section className="searchForm">
      <form className="searchForm__field" onSubmit={handleSubmit} noValidate>
        <img className="searchForm__magnifier" src={magnifier} alt="иконка лупы" />
        <input className="searchForm__input" type="text" name="movie" placeholder="Фильм" onChange={handleChange}
          {...register('movie', {
            required: 'Нужно ввести ключевое слово',
          })}
        />
        <button className={`searchForm__button button-opacity ${isValid ? '' : 'searchForm__button_disabled'}`} type="submit" aria-label="Кнопка поиска фильма"></button>
      </form>
      {errors.movie && <span className={errorClassname('movie')}>{errors.movie.message}</span>}
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
