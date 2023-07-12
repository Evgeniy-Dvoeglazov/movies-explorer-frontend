const apiMainConfig = {
  baseUrl: 'http://localhost:3001',
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
