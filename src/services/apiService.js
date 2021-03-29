const apiKey = '1d49edd8dc755bd713c5e3e6c8082541';
const URL = `https://api.themoviedb.org/3/`;

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('You`re looser'));
}

function getTrending() {
  return fetchWithErrorHandling(`${URL}trending/movie/day?api_key=${apiKey}`);
}

function searchMovies(query) {
  return fetchWithErrorHandling(
    `${URL}search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${query}`,
  );
}

function getMovieDetails(movieID) {
  return fetchWithErrorHandling(
    `${URL}movie/${movieID}?api_key=${apiKey}&language=en-US`,
  );
}

function getMovieCredits(movieID) {
  return fetchWithErrorHandling(
    `${URL}movie/${movieID}/credits?api_key=${apiKey}&language=en-US`,
  );
}

function getMovieReviews(movieID) {
  return fetchWithErrorHandling(
    `${URL}movie/${movieID}/reviews?api_key=${apiKey}&language=en-US&page=1`,
  );
}

const f = {
  getTrending,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
};

export default f;
