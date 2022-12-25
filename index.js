const movieListEl = document.querySelector(".movie__list");

async function renderMovies () {
    const movie = await (fetch("https://www.omdbapi.com/?apikey=2a3e348d&s=fast"));
    const movieData = await movie.json();

    console.log(movieData);

}

renderMovies();