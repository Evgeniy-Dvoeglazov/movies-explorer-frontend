import './App.css';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { Routes, Route } from 'react-router-dom';
import { apiMovies } from '../../utils/MoviesApi';
import { apiMain } from '../../utils/MainApi';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [moreMovies, setMoreMovies] = useState(0);
  const [shortMoviesActive, setShortMoviesActive] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);

  //Создаем эффект, который будет отслеживать ширину окна.
  //Далее мы сможем использовать это, чтобы дополнительный блок меню в шапке исчезал при увеличении ширины окна

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (loggedIn) {
      apiMain.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function changeMoviesCardListLength() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));

    if (width > 768) {
      setMovies(foundMovies.slice(0, 12));
      setMoreMovies(3);
    }
    if (width <= 768) {
      setMovies(foundMovies.slice(0, 8));
      setMoreMovies(2);
    }
    if (width <= 480) {
      setMovies(foundMovies.slice(0, 5));
      setMoreMovies(2);
    }
  }

  function addMoreMovies() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));

    setMovies(foundMovies.slice(0, movies.length + moreMovies));
  }

  function searchMovies(movieInputName) {
    setIsLoading(true);

    apiMovies.getMovies()
      .then((res) => {
        const foundMovies = res.filter((movie) => movie.nameRU.toLowerCase().includes(movieInputName.toLowerCase()));
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
        localStorage.setItem('movieInputName', movieInputName);
        localStorage.setItem('shortMoviesActive', shortMoviesActive);
        changeMoviesCardListLength();
      })
      .catch((err) => {
        console.log(err);
        setServerError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function saveMovie(movie) {
    apiMain.saveMovie(movie)
      .then((res) => {
        setSavedMovies([...res]);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Header
              loggedIn={false}
              isMainPage={true}
              width={width}
            />
            <Main />
            <Footer />
          </>
        } />
        <Route path="/movies" element={
          <>
            <Header
              loggedIn={true}
              isMainPage={false}
              width={width}
            />
            <Movies
            searchMovies={searchMovies}
            movies={movies}
            saveMovie={saveMovie}
            addMoreMovies={addMoreMovies}
            isLoading={isLoading}
            serverError={serverError}
            />
            <Footer />
          </>
        } />
        <Route path="/saved-movies" element={
          <>
            <Header
              loggedIn={true}
              isMainPage={false}
              width={width}
            />
            <SavedMovies />
            <Footer />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Header
              loggedIn={true}
              isMainPage={false}
              width={width}
            />
            <Profile />
          </>
        } />
        <Route path="/signin" element={
          <Login />
        }
        />
        <Route path="/signup" element={
          <Register />
        } />
        <Route path="*" element={
          <NotFoundPage />
        } />
      </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
