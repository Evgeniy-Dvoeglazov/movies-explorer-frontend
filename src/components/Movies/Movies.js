import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <section className="movies">
      <SearchForm
      searchMovies={props.searchMovies}
      />
      <MoviesCardList
        buttonText="Сохранить"
        changeButton={true}
        movies={props.movies}
        saveMovie={props.saveMovie}
        addMoreMovies={props.addMoreMovies}
        isLoading={props.isLoading}
        serverError={props.serverError}
      />
    </section>
  );
}

export default Movies;
