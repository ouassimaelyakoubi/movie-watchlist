const container = document.getElementById('watchlist');

function loadWatchlist() {
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  if (watchlist.length === 0) {
    container.innerHTML = `<h3>Your watchlist is looking a little empty...</h3>
            <div class="empty-watchlist">
                <img src="/images/add-icon-dark.png" alt="add icon with dark color" class="add-icon" />
                <a href="/index.html"><h4 class="explore-text">Let's add some movies!</h4></a>
            </div>`;
    return;
  }

  container.innerHTML = watchlist.map(movie => `
       <div class="movie">
          <img src="${movie.Poster}" alt="${movie.Title}" class="movie-poster">
          <div class="movie-info">
            <div class="movie-title-rating">
              <h3 class="movie-title">${movie.Title}</h3>
              <div class="movie-rating">
                <img src="./images/star-icon.png" alt="star icon" class="star-icon">
                <p>${movie.imdbRating}</p>
              </div>
            </div>
            <div class="movie-runtime-genre">
              <p class="movie-runtime">${movie.Runtime}</p>
              <p class="movie-genre">${movie.Genre}</p>
              <div class="remove-from-watchlist">
                <img src="./images/add-icon-dark.png" alt="add icon with dark color" class="add-icon">
                <button class="remove-btn" data-id="${movie.imdbID}">Remove</button>
              </div>
            </div>
            <p class="movie-plot">${movie.Plot}</p>
          </div>
        </div>
  `).join('');
}

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const idToRemove = e.target.dataset.id;
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const updated = watchlist.filter(m => m.imdbID !== idToRemove);
    localStorage.setItem('watchlist', JSON.stringify(updated));
    loadWatchlist(); // Refresh the UI
  }
});

document.addEventListener('DOMContentLoaded', loadWatchlist);
