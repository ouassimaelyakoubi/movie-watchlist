(() => {
  // Set the theme before DOM paints 
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
})();
const searchButton = document.getElementById('search-button');
const movieList = document.getElementById('movie-list');
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;


searchButton.addEventListener('click', async () => {
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();

  movieList.innerHTML = '';
  if (data.Search) {
    for (const movie of data.Search) {
      const movieDetails = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`).then(res => res.json());

      movieList.innerHTML += `
       <div class="movie">
                        <img src="${movieDetails.Poster}" alt="${movieDetails.Title}" class="movie-poster">
                        <div class="movie-info">
                            <div class="movie-title-rating">
                                <h3 class="movie-title">${movieDetails.Title}</h3>
                                <div class="movie-rating">
                                    <img src="./images/star-icon.png" alt="star icon" class="star-icon">
                                    <p>${movieDetails.imdbRating}</p>
                                </div>
                            </div>
                            <div class="movie-runtime-genre">
                                <p class="movie-runtime">${movieDetails.Runtime}</p>
                                <p class="movie-genre">${movieDetails.Genre}</p>
                                <div class="add-to-watchlist-container">
                                    <img src="./images/add-icon-dark.png" alt="add icon with dark color" class="add-icon">
                                    <button class="add-to-watchlist" id="add-to-watchlist-btn" data-id="${movieDetails.imdbID}">Watchlist</button>
                                </div>
                            </div>
                            <p class="movie-plot">${movieDetails.Plot}</p>
                        </div>
                    </div>
      `;
    }
    const currentTheme = localStorage.getItem('theme') || 'light';
    updateAddIconsForTheme(currentTheme);
  }
  else {
    movieList.innerHTML = `<p class="error-message">Unable to find what you’re looking for. Please try another search.</p>`;
  }
});

// Add to watchlist
movieList.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-watchlist')) {
    const movieId = e.target.dataset.id;
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`)
      .then(res => res.json())
      .then(movie => {
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        const exists = watchlist.some(m => m.imdbID === movie.imdbID);
        if (!exists) {
          watchlist.push(movie);
          localStorage.setItem('watchlist', JSON.stringify(watchlist));
        }
      });
  }
});


const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('.icon');

function updateAddIconsForTheme(theme) {
  document.querySelectorAll('.add-icon').forEach(img => {
    img.src = theme === 'dark'
      ? './images/add-icon-light.png'
      : './images/add-icon-dark.png';
  });
}

function setTheme(theme) {
  document.body.classList.toggle('dark-mode', theme === 'dark');
  icon.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', theme);

  // Update icons based on current theme
  updateAddIconsForTheme(theme);
}

toggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  setTheme(isDark ? 'light' : 'dark');
});

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
});
