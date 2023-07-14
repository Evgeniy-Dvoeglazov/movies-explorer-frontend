const apiMainConfig = {
  baseUrl: 'https://api.movies.dvoeglazov.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
  }
}

const apiMoviesConfig = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
}

export { apiMainConfig, apiMoviesConfig };
