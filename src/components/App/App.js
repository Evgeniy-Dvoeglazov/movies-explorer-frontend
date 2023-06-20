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
import Preloader from '../Preloader/Preloader';

function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Movies />
      <SavedMovies />
      <Profile />
      <Register />
      <Login />
      <NotFoundPage />
      <Preloader />
      <Footer />
    </div>
  );
}

export default App;
