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
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { apiMovies } from '../../utils/MoviesApi';
import { apiMain } from '../../utils/MainApi';
import * as auth from '../../utils/auth.js';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [moreMovies, setMoreMovies] = useState(0);
  const [isSavedMovie, setIsSavedMovie] = useState(false);
  const [successChangeProfile, setSuccessChangeProfile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);

  //Создаем эффект, который будет отслеживать ширину окна.

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    changeMoviesCardListLength();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);

  // Получаем данные пользователя
  function getUserInfo() {
    apiMain.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Получаем карточки во вкладке "избранное"
  useEffect(() => {
    if (loggedIn) {
      apiMain.getMovies()
        .then((res) => {
          setSavedMovies([...res]);
          setIsSavedMovie(true);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn, movies]);

  useEffect(() => {
    apiMain.getUserInfo()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
          navigate(location.pathname, { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Получаем карточки во влкадке movies в зависимости от ширины экрана
  function changeMoviesCardListLength() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
    if (foundMovies === null) {
      return
    }
    if (width > 1133) {
      setMovies(foundMovies.slice(0, 12));
      setMoreMovies(3);
    }
    if (width <= 1133) {
      setMovies(foundMovies.slice(0, 8));
      setMoreMovies(2);
    }
    if (width <= 643) {
      setMovies(foundMovies.slice(0, 5));
      setMoreMovies(2);
    }
  }

  // функция добавления дополнительных видео на кнопку "еще"
  function addMoreMovies() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));

    setMovies(foundMovies.slice(0, movies.length + moreMovies));
  }

  function getMovies() {
    setIsLoading(true);
    apiMovies.getMovies()
      .then((res) => {
        setAllMovies([...res]);
      })
      .catch((err) => {
        console.log(err);
        setServerError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // поиск фильмов
  function searchMovies(movieInputName, shortMoviesActive) {
    const moviesSearch = allMovies.filter((movie) => movie.nameRU.toLowerCase().includes(movieInputName.toLowerCase()));
    const foundMovies = shortMoviesActive ? moviesSearch.filter(movie => movie.duration <= 40) : moviesSearch;
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
    localStorage.setItem('movieInputName', movieInputName);
    localStorage.setItem('shortMoviesActive', shortMoviesActive);
    changeMoviesCardListLength();
  }

  function isSaved(movie) {
    return savedMovies.some((savedMovie) => savedMovie.movieId === movie.id && savedMovie.owner === currentUser._id);
  }

  // сохранение фильмов
  function saveMovie(movie) {
    apiMain.saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
        setIsSavedMovie(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // регистрация
  function handleRegister(name, email, password) {
    setIsLoading(true);
    auth.register(name, email, password)
      .then((res) => {
        if (res) {
          handleLogin(password, email);
        }
      })
      .catch((err) => {
        setServerError(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // авторизация
  function handleLogin(password, email) {
    setIsLoading(true);
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate('/movies', { replace: true });
          getUserInfo();
          getMovies();
        }
      })
      .catch((err) => {
        setServerError(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // выход из профиля
  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('movieInputName');
    localStorage.removeItem('shortMoviesActive');
    localStorage.removeItem('foundMovies');
    setMovies([]);
    auth.logOut()
      .then(() => {
        navigate('/', { replace: true });
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // удаление фильма из избранного
  function handleDeleteMovie(movie) {
    const deleteMovie = savedMovies.find(savedMovie => savedMovie.movieId === (movie.id || movie.movieId) && savedMovie.owner === currentUser._id);
    apiMain.removeMovie(deleteMovie._id)
      .then(() => {
        setSavedMovies((movies) => movies.filter((c) => c._id !== deleteMovie._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // изменение информации в профиле
  function handleUserUpdate({ name, email }) {
    setIsLoading(true);
    if (currentUser.name !== name || currentUser.email !== email) {
      apiMain.setUserInfo({ name, email })
        .then((res) => {
          setCurrentUser(res);
          setSuccessChangeProfile(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setSuccessChangeProfile(false);
    }
  }

  function changeVisibleProfileError() {
    setSuccessChangeProfile(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <Header
                loggedIn={loggedIn}
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
                loggedIn={loggedIn}
                isMainPage={false}
                width={width}
              />
              <ProtectedRouteElement
                element={Movies}
                searchMovies={searchMovies}
                movies={movies}
                saveMovie={saveMovie}
                addMoreMovies={addMoreMovies}
                isLoading={isLoading}
                serverError={serverError}
                loggedIn={loggedIn}
                isSaved={isSaved}
                onCardDelete={handleDeleteMovie}
              />
              <Footer />
            </>
          } />
          <Route path="/saved-movies" element={
            <>
              <Header
                loggedIn={loggedIn}
                isMainPage={false}
                width={width}
              />
              <ProtectedRouteElement
                element={SavedMovies}
                loggedIn={loggedIn}
                serverError={serverError}
                savedMovies={savedMovies}
                isSavedMovie={isSavedMovie}
                onCardDelete={handleDeleteMovie}
                isSaved={isSaved}
              />
              <Footer />
            </>
          } />
          <Route path="/profile" element={
            <>
              <Header
                loggedIn={loggedIn}
                isMainPage={false}
                width={width}
              />
              <ProtectedRouteElement
                element={Profile}
                loggedIn={loggedIn}
                onSignOut={handleLogout}
                onUpdateUser={handleUserUpdate}
                successChangeProfile={successChangeProfile}
                changeVisibleProfileError={changeVisibleProfileError}
                isLoading={isLoading}
              />
            </>
          } />
          {!loggedIn &&
            <Route path="/signin" element={
              <Login
                onLogin={handleLogin}
                serverError={serverError}
                isLoading={isLoading}
              />
            } />}
          {!loggedIn && <Route path="/signup" element={
            <Register
              onRegister={handleRegister}
              serverError={serverError}
              isLoading={isLoading}
            />
          } />}
          <Route path="*" element={
            <NotFoundPage />
          } />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
