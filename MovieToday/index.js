const BASE_URL = "https://api.themoviedb.org/3/",
  API_KEY = "8b870f6ed1c7d58ccfd644358e88439d",
  MOVIE_CONTAINER = document.getElementById("movie-list"),
  FORM = document.getElementById("form"),
  SEARCH_VALUE = document.getElementById("search-value"),
  NAVBAR = document.getElementById("navbar"),
  MODAL = document.getElementById("exampleModal"),
  BODY = document.getElementsByTagName("body")[0],
  MOVIE_TITLE = document.getElementById("modal-title"),
  MOVIE_DATA = document.getElementById("modal-date"),
  loadBtn = document.getElementById("load-btn"),
  MODAL_INFO = document.getElementById("modal-info"),
  MOVIE_IMAGE = document.getElementById("modal-image"),
  MOVIE_DESCRIPTION = document.getElementById("modal-description");

let navlink = document.getElementsByClassName("nav-link"),
  cards = document.getElementsByClassName("card"),
  val = 1,
  colorStateValue = 0,
  dataValue = "top_rated",
  formValue = "",
  pageSize = 1;

FORM.addEventListener("submit", sendData);

window.addEventListener('resize', () => {
  if (window.innerWidth < 600) {
    MODAL_INFO.classList.add('d-block')
    MODAL_INFO.classList.remove('d-flex')

    MOVIE_IMAGE.classList.add("d-flex", "mx-auto", "mb-2")

    MOVIE_DESCRIPTION.classList.add('text-center')
    MOVIE_DESCRIPTION.classList.remove('text-justify')

  } else {

    MODAL_INFO.classList.add('d-flex')
    MODAL_INFO.classList.remove('d-block')

    MOVIE_IMAGE.classList.remove("d-flex", "mx-auto", "mb-2")

    MOVIE_DESCRIPTION.classList.remove('text-center')
    MOVIE_DESCRIPTION.classList.add('text-justify')

  }

})

function changeTheme(event) {

  if (colorStateValue == 0) {
    event.firstElementChild.classList.remove("fa-moon")
    event.firstElementChild.classList.add("fa-sun")
    event.firstElementChild.style.color = 'white'
    BODY.classList.add("bg-dark")

    NAVBAR.classList.remove("navbar-light", "bg-light")
    NAVBAR.classList.add("navbar-dark", "bg-dark")

    MODAL.firstElementChild.firstElementChild.classList.add("bg-dark", "text-white")

    for (let index = 0; index < cards.length; index++) {
      const element = cards[index];
      element.classList.add("bg-dark", "text-white")
    }

    NAVBAR.children[2].lastElementChild.lastElementChild.classList.remove("btn-outline-dark")
    NAVBAR.children[2].lastElementChild.lastElementChild.classList.add("btn-outline-light")
    colorStateValue = 1
  } else {

    event.firstElementChild.classList.remove("fa-sun")
    event.firstElementChild.classList.add("fa-moon")
    event.firstElementChild.style.color = 'black'
    BODY.classList.remove("bg-dark")

    for (let index = 0; index < cards.length; index++) {
      const element = cards[index];
      element.classList.remove("bg-dark", "text-white")
    }

    NAVBAR.classList.add("navbar-light", "bg-light")
    NAVBAR.classList.remove("navbar-dark", "bg-dark")

    MODAL.firstElementChild.firstElementChild.classList.remove("bg-dark", "text-white")

    NAVBAR.children[2].lastElementChild.lastElementChild.classList.remove("btn-outline-light")
    NAVBAR.children[2].lastElementChild.lastElementChild.classList.add("btn-outline-dark")

    colorStateValue = 0
  }


  for (let index = 0; index < navlink.length; index++) {
    const element = navlink[index];

    if (colorStateValue == 0 && element.style.background == "white") {
      element.style.background = "black";
      element.style.color = "white";
    }
    if (colorStateValue == 1 && element.style.background == "black") {
      element.style.background = "white";
      element.style.color = "black";
    }
  }
}

loadBtn.addEventListener('click', function () {

  if (pageSize < 5) {
    pageSize += 1
    chargeContent()
  } else
    alert("the limit has been reached")

})

function addLoader() {
  MOVIE_CONTAINER.className = "container d-flex justify-content-center";
  MOVIE_CONTAINER.innerHTML = `<div class="spinner-border d-flex" role="status">
    </div>`;
  loadBtn.style.display = "none"
}

function sendData(event) {
  val = 2;
  pageSize = 1
  noColorizeLink();
  formValue = SEARCH_VALUE.value;
  event.preventDefault();
  addLoader()

  setTimeout(chargeContent, 500);
}

function chargeContent() {
  MOVIE_CONTAINER.className = "container";
  loadBtn.style.display = "block"
  if (pageSize == 1) {
    MOVIE_CONTAINER.innerHTML = "";
  }

  switch (val) {
    case 1:
      endpointData("movie/" + dataValue + "/", pageSize);
      break;

    case 2:
      if (formValue == null || formValue == "" || formValue == undefined)
        alert("no empty value permitted");
      else
        endpointData("search/movie/", pageSize, formValue);
      break;

    default:
      alert("error changing content");
      break;
  }
}

function noColorizeLink() {
  for (let index = 0; index < navlink.length; index++) {
    const element = navlink[index];
    element.style.background = "none";
    element.style.color = "#707071";
  }
}

for (let index = 0; index < navlink.length; index++) {
  const element = navlink[index];

  element.onclick = () => {

    pageSize = 1
    val = 1;
    noColorizeLink();

    if (colorStateValue == 0) {
      element.style.background = "black";
      element.style.color = "white";

    } else {
      element.style.background = "white";
      element.style.color = "#343a40";
    }

    dataValue = element.dataset.val;

    addLoader()
    setTimeout(chargeContent, 500);
  };

}

function showMovieDescription(e) {

  let {
    title,
    image,
    overview,
    date
  } = e.dataset;

  MOVIE_TITLE.textContent = title;
  MOVIE_DATA.textContent = date;
  MOVIE_IMAGE.src = "https://image.tmdb.org/t/p/w200/" + image;
  MOVIE_DESCRIPTION.textContent = overview;
}

function endpointData(endpoint, pageSize = null, searchParam = null) {
  getMovies(endpoint, pageSize, searchParam).then((response) => {
    if (response.results.length <= 0) {
      loadBtn.style.display = "none"
      MOVIE_CONTAINER.insertAdjacentHTML(
        "beforeend", `<div class="alet alert-danger px-3 py-3">No results</div>`)

    } else {
      for (key in response.results) {
        const element = response.results[key];
        MOVIE_CONTAINER.insertAdjacentHTML(
          "beforeend",
          `<div class="col col-md-4 col-sm-6 col-xl-2 portrait">
                 <div class="card ${colorStateValue == 0 ? "bg-light" : "bg-dark"}"  style="padding:0">
                  <button onclick="showMovieDescription(this)"  data-image="${element.poster_path}"
                  data-title="${element.title}"  data-overview="${element.overview}" data-date="${element.release_date}"
                  class="card-info" data-toggle="modal" data-target="#exampleModal" >
                 
                  <span class="rating">  ${element.vote_average} <i class="fas fa-star"></i></span>
                 
                  <p class="card-title">${element.title.length > 20 ? element.title.slice(0,13) + "..." : element.title}</p>
                    <p class="categories">   ${element.release_date.slice(0, 4)}</p>
                      </button>
                       <div class="card-header">
                           <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${
                             element.poster_path
                           }" alt="...">
                     </div>
                 </div>
             </div>`
        );
      }
    }
  });
}

function getMovies(endpoint, parPageSize, searchParam) {
  parPageSize = pageSize
  return new Promise((resolve, reject) => {
    fetch(
        BASE_URL + endpoint + "/" + "?api_key=" + API_KEY + "&query=" + searchParam + "&page=" + parPageSize
      )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

endpointData("movie/top_rated/");