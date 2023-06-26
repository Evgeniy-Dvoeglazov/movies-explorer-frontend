import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Header
              loggedIn={false}
              isMainPage={true}
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
            />
            <Movies />
            <Footer />
          </>
        } />
        <Route path="/saved-movies" element={
          <>
            <Header
              loggedIn={true}
              isMainPage={false}
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
  );
}

export default App;
