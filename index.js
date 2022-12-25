const movieListEl = document.querySelector('.movie__list');
const skeletonMovies = document.querySelector('.movie__list--wrapper')
const skeletonFilter = document.querySelector('.filter__wrapper')
let movies;

async function renderMovies (filter) {
    const movie = await (fetch("https://www.omdbapi.com/?apikey=2a3e348d&s=fast"));
    const movieSearchResults = await movie.json();
    const movieData = await (movieSearchResults.Search);
    skeletonMovies.classList += ' movies__loading';
    skeletonFilter.classList += ' movies__loading';
    
    if(!movies) {
        movies = movieData;
    }    
    
    setTimeout(function() {
        skeletonMovies.classList.remove('movies__loading');
        skeletonFilter.classList.remove('movies__loading');
    }, 1000);

    //skeletonPhase.classList.remove('movies__loading');



    if (filter === 'LOW_TO_HIGH') {
        filteredMovies = movies.sort ((a, b) => a.Year - b.Year)
        movieListEl.innerHTML = filteredMovies.map((movie) => moviesHTML(movie)).join("");
    }
    else if (filter === 'HIGH_TO_LOW') {
        filteredMovies = movies.sort ((a, b) => b.Year - a.Year)
        movieListEl.innerHTML = filteredMovies.map((movie) => moviesHTML(movie)).join("");
    }
    else{
        movieListEl.innerHTML = movieData.map((movie) => moviesHTML(movie)).join("");
    }
    
}
renderMovies();

function filterMovies(event) {
    renderMovies(event.target.value)
}

function moviesHTML(movie) {
    return `
    <div class="movie__wrapper">
    <h3 class="movie__title">${movie.Title}</h3>
    <h4 class="movie__year">${movie.Year}</h4>
    <figure class="movie__img--wrapper">
    <img src="${movie.Poster}" class="movie__img">
    </figure>
    </div>
    `
}

// function getInputValue() {
//     let inputValue = document.getElementById("movieName").value;
//     alert("Value is " += inputValue);
// }