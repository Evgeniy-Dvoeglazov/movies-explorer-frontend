import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));

  if (props.isLoading) {
    return (
      <Preloader />
    )
  }

  if (props.serverError) {
    return (
      <p className="moviesCardList__error">Во&nbsp;время запроса произошла ошибка. Возможно, проблема с&nbsp;соединением или сервер недоступен. Подождите немного и&nbsp;попробуйте ещё раз</p>
    )
  }

  if (props.movies.length === 0) {
    return (
      <p className="moviesCardList__error">Ничего не найдено</p>
    );
  }

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__content">
        {foundMovies.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            buttonText={props.buttonText}
            changeButton={props.changeButton}
            saveMovie={props.saveMovie}
          />
        ))
        }
      </ul>
      {foundMovies.length !== props.movies.length && props.movies.length !== 0 ? <button className="moviesCardList__button button-opacity" type="button" onClick={props.addMoreMovies}>Ещё</button> : ''}
    </section>
  );
}

export default MoviesCardList;
