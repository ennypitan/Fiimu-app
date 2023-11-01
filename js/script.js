const global = {
  currentPage: window.location.pathname,
};

// Fetches the Popular movies from API
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  console.log(results);
  results.forEach((movie) => {
    // console.log(movie);
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
           ${
             movie.poster_path
               ? ` <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
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
              <small class="text-muted">Release:${movie.release_date}</small>
            </p>
          </div>
        `;
    document.querySelector("#popular-movies").appendChild(div);
  });
}

// Fetches the Popular Shows from API
async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");
  console.log(results);
  results.forEach((show) => {
    console.log(show);
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
           ${
             show.poster_path
               ? ` <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
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
              <small class="text-muted">First Air Date:${
                show.first_air_date
              }</small>
            </p>
          </div>
        `;
    document.querySelector("#popular-shows").appendChild(div);
  });
}

// Display Movie Details
async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  console.log(movieId);
  const movie = await fetchAPIData(`movie/${movieId}`);

  // overlay for background image
  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
          <div class="image-card">
             ${
               movie.poster_path
                 ? ` <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.name}"
            />`
                 : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
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
            <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString()}</li>
            <li><span class="text-secondary">Revenue:</span>$${movie.revenue.toLocaleString()}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">  
          ${movie.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(", ")}</div>
        </div>`;
  document.querySelector("#movie-details").appendChild(div);
}

// Display Backdropon detail pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.2";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

// Display Show Details
async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];
  console.log(showId);
  const show = await fetchAPIData(`tv/${showId}`);

  // overlay for background image
  displayBackgroundImage("tv", show.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
          <div>
             ${
               show.poster_path
                 ? ` <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.title}"
            />`
                 : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />`
             }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">First Air Date: ${show.first_air_date}</p>
            <p>
             ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
             ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Numbers of Episodes:</span>${
              show.number_of_episodes
            } </li>
            <li><span class="text-secondary">Last Episodes To Air:</span>${
              show.last_episode_to_air.name
            }</li>
           
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">  
          ${show.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(", ")}</div>
        </div>`;
  document.querySelector("#show-details").appendChild(div);
}

// Display Backdropon detail pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.2";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

// Display Slider
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");
  console.log(results);
  results.forEach((now_playing) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
            <a href="movie-details.html?id=${now_playing.id}"> ${
      now_playing.poster_path
        ? ` <img
              src="https://image.tmdb.org/t/p/w500${now_playing.poster_path}"
              class="card-img-top"
              alt="${now_playing.name}"
            />`
        : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />`
    }
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${
                now_playing.vote_average
              }/ 10
            </h4>
          `;
    document.querySelector(".swiper-wrapper").appendChild(div);
    initSwiper();
  });
  function initSwiper() {
    const swiper = new Swiper(".swiper", {
      autoplay: {
        delay: 5000,
      },
      loop: true,
      freeMode: true,
      slidesPerView: 1,
      spaceBetween: 10,
      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    });
  }
}

// Fetch Data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = "97e23c2e4c05eccd81a0fadc947ac9eb";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

function highlightLinks() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

// Init App
function init() {
  switch (global.currentPage) {
    case "/index.html":
    case "/":
      displaySlider();
      displayPopularMovies();
      console.log("Home");
      break;
    case "/movie-details.html":
      displayMovieDetails();
      console.log("Movie Details Page");
      break;
    case "/search.html":
      console.log("Search Page");
      break;
    case "/shows.html":
      displayPopularShows();
      console.log("Shows Page");
      break;
    case "/tv-details.html":
      console.log("TV Details Page");
      displayShowDetails();
      break;
  }
  highlightLinks();
}
document.addEventListener("DOMContentLoaded", init);
