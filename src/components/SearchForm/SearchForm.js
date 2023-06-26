import './SearchForm.css';
import magnifier from '../../images/magnifier.svg'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className="searchForm">
      <form className="searchForm__field">
        <img className="searchForm__magnifier" src={magnifier} alt="иконка лупы" />
        <input className="searchForm__input" type="text" name="movie" placeholder="Фильм" required />
        <button className="searchForm__button button-opacity" type="submit" aria-label="Кнопка поиска фильма"></button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
