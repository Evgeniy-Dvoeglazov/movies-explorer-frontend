import { apiMainConfig } from './config';

class ApiMain {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получаем данные о пользователе с сервера

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  // Обновляем информацию о пользователе на сервере

  setUserInfo({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  // Получаем сохраненные пользователем фильмы

  getMovies() {
    return fetch(`${this._url}/movies`, {
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  // Сохраняем фильм в избранное

  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        owner: movie.owner,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      })
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  // Удаляем фильм из избранного

  removeMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }
}

const apiMain = new ApiMain(apiMainConfig);
export { apiMain };
