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
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { apiMovies } from '../../utils/MoviesApi';
import { apiMain } from '../../utils/MainApi';
import * as auth from '../../utils/auth.js';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [moreMovies, setMoreMovies] = useState(0);
  const [isSavedMovie, setIsSavedMovie] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);

  //Создаем эффект, который будет отслеживать ширину окна.
  //Далее мы сможем использовать это, чтобы дополнительный блок меню в шапке исчезал при увеличении ширины окна

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

  useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      apiMain.getMovies()
        .then((res) => {
          setSavedMovies([...res]);
          setIsSavedMovie(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn, movies]);

  useEffect(() => {
    tokenCheck();
  }, []);

  // useEffect(() => {
  //     navigate(location.pathname, { replace: true });
  // }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      setIsLoading(true);
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(location.pathname, { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/signin", { replace: true })
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

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

  function searchMovies(movieInputName, shortMoviesActive) {
    setIsLoading(true);

    apiMovies.getMovies()
      .then((res) => {
        const moviesSearch = res.filter((movie) => movie.nameRU.toLowerCase().includes(movieInputName.toLowerCase()));
        const foundMovies = shortMoviesActive ? moviesSearch.filter(movie => movie.duration <= 40) : moviesSearch;
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

  function isSaved(movie) {
    return savedMovies.some((savedMovie) => savedMovie.movieId === movie.id && savedMovie.owner === currentUser._id);
  }

  function saveMovie(movie) {

    apiMain.saveMovie(movie)
      .then((res) => {
        console.log(res)
        setSavedMovies([res, ...savedMovies]);
        setIsSavedMovie(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(name, email, password) {
    auth.register(name, email, password)
      .then((res) => {
        if (res) {
          navigate('/signin', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(password, email) {
    auth.authorize(password, email)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem('token');
    auth.logOut()
      .then(() => {
        navigate('/signin', { replace: true });
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(movie) {
    const deleteMovie = savedMovies.find(savedMovie => savedMovie.movieId === (movie.id || savedMovie.movieId) && savedMovie.owner === currentUser._id);

    apiMain.removeMovie(deleteMovie._id)
      .then(() => {
        setMovies((movies) => movies.filter((c) => c._id !== deleteMovie._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUserUpdate({name, email}) {
    apiMain.setUserInfo({name, email})
    .then((res) => {
      console.log(res);
      setCurrentUser(res);
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
                searchMovies={searchMovies}
                loggedIn={loggedIn}
                isLoading={isLoading}
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
              <Profile
                onSignOut={handleLogout}
                isLoading={isLoading}
                onUpdateUser={handleUserUpdate}
              />
            </>
          } />
          <Route path="/signin" element={
            <Login onLogin={handleLogin} />
          }
          />
          <Route path="/signup" element={
            <Register onRegister={handleRegister} />
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
