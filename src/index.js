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




/* 
const searchButton = document.getElementById('search-button');
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

console.log(API_KEY)
searchButton.addEventListener('click', function(){
    let movieInput = document.getElementById('search-input').value;
    console.log(movieInput)
    if(movieInput){

        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${movieInput}`)
        .then(response => response.json())
        .then(data => {
            let html = ''
            data.Search.map(movie => {
                fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${movie.Title}`)
                .then(response => response.json())
                .then(movieData => {
                    console.log(movieData)
                    html +=`
                    <div class="movie">
                        <img src="${movieData.Poster}" alt="${movieData.Title}" class="movie-poster">
                        <div class="movie-info">
                            <div class="movie-title-rating">
                                <h3 class="movie-title">${movieData.Title}</h3>
                                <div class="movie-rating">
                                    <img src="./images/star-icon.png" alt="star icon" class="star-icon">
                                    <p>${movieData.imdbRating}</p>
                                </div>
                            </div>
                            <div class="movie-runtime-genre">
                                <p class="movie-runtime">${movieData.Runtime}</p>
                                <p class="movie-genre">${movieData.Genre}</p>
                                <div class="add-to-watchlist-container">
                                    <img src="./images/add-icon-dark.png" alt="add icon with dark color" class="add-icon">
                                    <button class="add-to-watchlist" id="add-to-watchlist-btn" data-movie='${JSON.stringify(movieData)}'>Watchlist</button>
                                </div>
                            </div>
                            <p class="movie-plot">${movieData.Plot}</p>
                        </div>
                    </div>
                    
                    `
                    console.log(html)
            document.getElementById('movie-list').innerHTML = html;
                }) 
            })

        })

        .catch(error => console.error('Error fetching data:', error));
    }
    
})

document.getElementById('movie-list').addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('add-to-watchlist')) {
    const movieData = JSON.parse(e.target.dataset.movie);

    // Get existing watchlist from localStorage or initialize an empty array
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    // Check if movie is already in watchlist (optional)
    const alreadyExists = watchlist.some(m => m.imdbID === movieData.imdbID);
    if (!alreadyExists) {
      watchlist.push(movieData);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));

      // Append new movie to the watchlist section
      document.getElementById('watchlist').innerHTML += `
        <div class="movie">
          <img src="${movieData.Poster}" alt="${movieData.Title}" class="movie-poster">
          <div class="movie-info">
            <div class="movie-title-rating">
              <h3 class="movie-title">${movieData.Title}</h3>
              <div class="movie-rating">
                <img src="./images/star-icon.png" alt="star icon" class="star-icon">
                <p>${movieData.imdbRating}</p>
              </div>
            </div>
            <div class="movie-runtime-genre">
              <p class="movie-runtime">${movieData.Runtime}</p>
              <p class="movie-genre">${movieData.Genre}</p>
              <div class="remove-from-watchlist">
                <img src="./images/add-icon-dark.png" alt="add icon with dark color" class="add-icon">
                <button class="remove-btn" data-id="${movieData.imdbID}">Remove</button>
              </div>
            </div>
            <p class="movie-plot">${movieData.Plot}</p>
          </div>
        </div>

      `;
                  console.log("Button clicked for:", movieData);

    }
  }
}); */

