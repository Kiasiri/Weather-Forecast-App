var geoCodingUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
var oneCall = "https://api.openweathermap.org/data/2.5/onecall?";
var APIkey = "&appid=847614a96bad4bae8518be6e90117639";
var exclude = "&exclude=hourly,minutely,alerts";
var searchBtn = document.querySelector("#search-btn");
let lat;
let lon;

searchBtn.addEventListener("click", searchGeo);
function searchGeo() {
  var searchInputVal = document.querySelector("#search-input").value;
  fetch(geoCodingUrl + searchInputVal + ",us" + "&units=imperial" + APIkey)
    .then((response) => {
      //   console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data[0].lat;
      lon = data[0].lon;
      console.log(lat, lon);

      searchOneCall();
    });
}
function showResults() {
  var resultCard = document.createElement("div");
  resultCard.classList.add("card", "bg-light", "text-dark", "mb-3", "p-3");

  var resultBody = document.createElement("div");
  resultBody.classList.add("card-body");

  var bodyContentEl = document.createElement("p");
  bodyContentEl.textContent = (lat, lon).current.weather.icon;

  var titleEl = document.createElement("h3");
  titleEl.textContent = city.name;
  resultBody.appendChild(titleEl);
  resultCard.appendChild(resultBody);
  document.body.appendChild(resultCard);
}
function searchOneCall() {
  fetch(
    oneCall +
      "lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=imperial" +
      exclude +
      APIkey
  )
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      showResults();
    });
}
