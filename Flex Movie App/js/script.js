const apiKey = "DUMMY_API_KEY";
const apiUrl = "https://api.themoviedb.org/3/";

const global = {
    currentPage: window.location.pathname,
    search: {
        term: "",
        type: "",
        page: 1,
        total_pages: 1,
        total_results: 0,
    },
};

// fetch Popular Movies
async function displayPopularMovies() {
    const { results } = await fetchAPIData("movie/popular");
    results.forEach((movie) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
          ${
              movie.poster_path
                  ? `            <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title} poster"
            />`
                  : `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
          />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
          `;

        document.querySelector("#popular-movies").appendChild(div);
    });
}

// fetch Popular Movies
async function displayPopularShows() {
    const { results } = await fetchAPIData("tv/popular");
    results.forEach((show) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
          ${
              show.poster_path
                  ? `            <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name} poster"
            />`
                  : `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
          />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
          `;

        document.querySelector("#popular-shows").appendChild(div);
    });
}

//Display Movie Details
async function displayMovieDetails() {
    const movieId = window.location.search.split("=")[1];

    const movie = await fetchAPIData(`movie/${movieId}`);

    // Overlay for the movie details

    displayBackgroundImage("movie", movie.backdrop_path);

    const div = document.createElement("div");
    div.innerHTML = `
         <div class="details-top">
          <div>
            ${
                movie.poster_path
                    ? `            <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              alt="${movie.title} poster"
            />`
                    : `<img
            src="images/no-image.jpg"
            alt="${movie.title} poster"
            />`
            }
            
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">

            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>

            <a href="${
                movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> ${addCommasToNumber(
                movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> ${addCommasToNumber(
                movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
                movie.runtime
            }</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies.map(
              (company) => `<span> ${company.name} </span>`
          )}
          </div>
        </div>
    `;

    document.querySelector("#movie-details").appendChild(div);
}

//Display Show Details
async function displayShowDetails() {
    const showId = window.location.search.split("=")[1];

    const show = await fetchAPIData(`tv/${showId}`);

    // Overlay for the movie details

    displayBackgroundImage("tv", show.backdrop_path);

    const div = document.createElement("div");

    div.innerHTML = `
         <div class="details-top">
          <div>
            ${
                show.poster_path
                    ? `            <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              alt="${show.name} poster"
            />`
                    : `<img
            src="images/no-image.jpg"
            alt="${show.name} poster"
            />`
            }
            
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Air Date: ${show.first_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">

            ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>

            <a href="${
                show.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes: </span> ${
                show.number_of_episodes
            }
            </li>
                        <li><span class="text-secondary">Number of Seasons: </span> ${
                            show.number_of_seasons
                        }
            </li>
            <li><span class="text-secondary">Last Episode to Air:</span> ${
                show.last_episode_to_air.name
            }</li>

            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${show.production_companies.map(
              (company) => `<span> ${company.name} </span>`
          )}
          </div>
        </div>
    `;

    document.querySelector("#show-details").appendChild(div);
}

// Display Backdrop Image
function displayBackgroundImage(type, backdrop_path) {
    const overlayDiv = document.createElement("div");
    overlayDiv.classList.add("bg_overlay");
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backdrop_path})`;

    if (type === "movie") {
        document.querySelector("#movie-details").appendChild(overlayDiv);
    } else {
        document.querySelector("#show-details").appendChild(overlayDiv);
    }
}

// Search Movie Show
async function search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    global.search.type = urlParams.get("type");
    global.search.term = urlParams.get("search-term");

    if (global.search.term !== null && global.search.term !== "") {
        // make - request and display result
        const { results, total_pages, page, total_results } =
            await searchAPIData();

        global.search.page = page;
        global.search.total_pages = total_pages;
        global.search.total_results = total_results;

        if (results.length === 0) {
            showAlert("No results found", "alert-error");
            return;
        }
        displaySearchResults(results);

        document.querySelector("#search-term").textContent = "";

        console.log(results);
    } else {
        showAlert("Please enter a search term", "alert-error");
    }
}

// Display Search Results
function displaySearchResults(results) {
    // Clear previous search results

    document.querySelector("#search-results").innerHTML = "";
    document.querySelector("#search-results-heading").innerHTML = "";
    document.querySelector("#pagination").innerHTML = "";

    const div = document.createElement("div");
    div.classList.add("card");

    results.forEach((result) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <a href="${global.search.type}-details.html?id=${result.id}">
          ${
              result.poster_path
                  ? `            <img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt="${
                  global.search.type === "movie" ? result.title : result.name
              } poster"
            />`
                  : `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${
                global.search.type === "movie" ? result.title : result.name
            } poster"
          />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
                global.search.type === "movie" ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                  global.search.type === "movie"
                      ? result.release_date
                      : result.first_air_date
              }</small>
            </p>
          </div>
          `;

        document.querySelector("#search-results-heading").innerHTML = `
        <h2>${results.length} of ${global.search.total_results} Results for ${global.search.term}
        </h2>
        `;

        document.querySelector("#search-results").appendChild(div);

        // Pagination
    });
    displayPagination();
}

// Display Pagination
function displayPagination() {
    const paginationEl = document.createElement("div");
    paginationEl.classList.add("pagination");

    paginationEl.innerHTML = `
    <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${global.search.page} of ${global.search.total_pages}</div>
                    `;

    document.querySelector("#pagination").appendChild(paginationEl);

    if (global.search.page === 1) {
        document.querySelector("#prev").disabled = true;
    }

    if (global.search.page === global.search.total_pages) {
        document.querySelector("#next").disabled = true;
    }

    document.querySelector("#next").addEventListener("click", async () => {
        global.search.page++;
        const { results, total_pages } = await searchAPIData();
        displaySearchResults(results);
    });

    document.querySelector("#prev").addEventListener("click", async () => {
        global.search.page--;
        const { results, total_pages } = await searchAPIData();
        displaySearchResults(results);
    });
}

// Display Slider Movies
async function displaySliderMovies() {
    const { results } = await fetchAPIData("movie/now_playing");
    results.forEach((movie) => {
        const div = document.createElement("div");
        div.classList.add("swiper-slide");

        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
        <img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          alt="${movie.title} swiper"
        />
        </a>
          <h2 class="swiper-rating">${movie.vote_average.toFixed(1)} / 10</h2>

      `;

        document.querySelector(".swiper-wrapper").appendChild(div);
        initSwiper();
    });
}

function initSwiper() {
    const swiper = new Swiper(".swiper", {
        slidesPreView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            700: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });
}

// Fetch Data from TMDB API
async function fetchAPIData(endpoint) {
    const API_KEY = apiKey;
    const API_URL = apiUrl;

    showSpinner();

    const response = await fetch(
        `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );

    const data = await response.json();

    hideSpinner();
    return data;
}

// Search API Data

async function searchAPIData() {
    const API_KEY = apiKey;
    const API_URL = apiUrl;

    showSpinner();

    const response = await fetch(
        `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
    );

    const data = await response.json();

    hideSpinner();
    return data;
}

// Spinner
function showSpinner() {
    document.querySelector(".spinner").classList.add("show");
}

function hideSpinner() {
    document.querySelector(".spinner").classList.remove("show");
}

// highlight active link

function highlightActiveLink() {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
        if (link.getAttribute("href") === global.currentPage) {
            link.classList.add("active");
        }
    });
}

// Show Alert

function showAlert(message, className = "alert-error") {
    const alertEl = document.createElement("div");
    alertEl.classList.add("alert", className);

    alertEl.appendChild(document.createTextNode(message));

    document.querySelector("#alert").appendChild(alertEl);

    setTimeout(() => {
        alertEl.remove();
    }, 3000);
}

function addCommasToNumber(number) {
    return "$" + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Init App

function init() {
    switch (global.currentPage) {
        case "/":
        case "/index.html":
            displaySliderMovies();
            displayPopularMovies();
            break;
        case "/shows.html":
            displayPopularShows();
            break;
        case "/movie-details.html":
            displayMovieDetails();
            break;
        case "/tv-details.html":
            displayShowDetails();
            break;
        case "/search.html":
            search();
            break;
        case "/":
            console.log("Home Page");
            break;
    }

    highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
