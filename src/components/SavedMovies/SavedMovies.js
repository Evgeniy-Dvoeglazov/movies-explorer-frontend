import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import deleteCardBtnImage from '../../images/button-delete.svg';

function SavedMovies() {
  return (
    <section className="savedMovies">
      <SearchForm />
      <MoviesCardList
        buttonText={
          <img src={deleteCardBtnImage} />
        }
        changeButton={false}
      />
    </section>
  );
}

export default SavedMovies;
