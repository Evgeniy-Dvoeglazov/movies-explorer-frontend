import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../utils/config';
import { useState } from 'react';

function MoviesCardList(props) {
  const [isButtonActive, setIsButtonActive] = useState(6);

  const addMoreCards = () => isButtonActive < movies.length
    ? setIsButtonActive(isButtonActive + 3)
    : '';

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__content">
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            buttonText={props.buttonText}
            changeButton={props.changeButton}
          />
        )).slice(0, isButtonActive)
        }
      </ul>
      {isButtonActive !== movies.length ? <button className="moviesCardList__button button-opacity" type="button" onClick={addMoreCards}>Ещё</button> : ''}
    </section>
  );
}

export default MoviesCardList;
