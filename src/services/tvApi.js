const baseUrl = 'https://api.themoviedb.org';
const API_KEY = 'e9c00b095d53c75e159eaea8f39d4d88';

export const fetchTrending = () => {
    return fetch(`${baseUrl}/3/trending/movie/day?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => data.results);
};

export const fetchMovieDetails = (id) => {
    return fetch(`${baseUrl}/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
        .then(res => res.json())
}

export const fetchQuery = (query) => {
    return fetch(`${baseUrl}/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`)
        .then(res => res.json())
        .then(data => data.results)
};

export const fetchCast = (id) => {
  return fetch(`${baseUrl}/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
    .then(res => res.json())
    .then(data => data);
};

export const fetchReviews = (id) => {
  return fetch(`${baseUrl}/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
    .then(res => res.json())
    .then(data => data);
};