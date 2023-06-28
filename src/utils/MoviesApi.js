import { apiMoviesConfig } from './config';

class ApiMovies {
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

  // Получаем фильмы с сервера

  getMovies() {
    return fetch(this._url, {
      headers: this._headers
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }
}

const apiMovies = new ApiMovies(apiMoviesConfig);
export { apiMovies };
