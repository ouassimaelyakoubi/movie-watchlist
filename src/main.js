const searchButton = document.getElementById('search-button');
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;

console.log(API_KEY)
let moviesArray = [];
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
                                    <button class="add-to-watchlist" data-movie='${JSON.stringify(movieData)}'>Watchlist</button>
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
    movieInput = '';
})
