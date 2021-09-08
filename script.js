var geoCodingUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
var oneCall = "https://api.openweathermap.org/data/2.5/onecall?";
var APIkey = "&appid=2bc1f0b51ed045438d94380043507d78";
var exclude = "&exclude=hourly,minutely,alerts";
var fiveDay = document.getElementById("five-day");
var container = document.getElementById("container");
var currentDay = document.getElementById("current-day");
var historyBox = document.getElementById("history-box");
var searchBtn = document.querySelector(".search-btn");
let lat;
let lon;
var searchInputVal = document.querySelector("#search-input").value;
let maxStorage = 0;
searchBtn.addEventListener("click", searchGeo);
searchBtn.addEventListener("click", loadText);
function searchGeo() {
  var searchInputVal = document.querySelector("#search-input").value;
  fetch(geoCodingUrl + searchInputVal + ",us" + "&units=imperial" + APIkey)
    .then((response) => {
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
function showResults(data) {
  var currentCard = document.createElement("div");
  currentCard.classList.add("card", "bg-primary", "text-light", "mb-2", "p-1");

  var resultBody = document.createElement("div");
  resultBody.classList.add("card-body");

  var futureDate = document.createElement("h3");

  var icon = document.createElement("img");
  icon.src =
    "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";

  var windSpeed = document.createElement("p");
  windSpeed.textContent = "Windspeed:" + data.current.wind_speed + "mph";

  var temprature = document.createElement("p");
  temprature.textContent =
    "Temprature: " +
    data.current.temp +
    "°F" +
    ", " +
    "Feels like " +
    data.current.feels_like +
    "°F";
  var uvi = document.createElement("p");
  uvi.textContent = "UVI: " + data.current.uvi;
  if (data.current.uvi <= 3) {
    uvi.classList.add("bg-success");
  } else if (data.current.uvi >= 3 && data.current.uvi <= 8) {
    uvi.classList.add("bg-warning");
  } else if (data.current.uvi >= 8) {
    uvi.classList.add("bg-danger");
  }

  var humidity = document.createElement("p");
  humidity.textContent = "Humidity:" + data.current.humidity + "%";
  var currentDate = document.createElement("h3");
  var month = new Date().getMonth();
  var date = new Date().getDate();
  currentDate.textContent = month + "/" + date;

  document.body.appendChild(currentCard);
  currentCard.appendChild(currentDate);
  currentCard.appendChild(icon);
  currentCard.appendChild(temprature);
  currentCard.appendChild(windSpeed);
  currentCard.appendChild(humidity);
  currentCard.appendChild(uvi);

  //resultBody.appendChild(currentCard);
  currentDay.appendChild(currentCard);

  for (let i = 0; i <= 4; i++) {
    var forecastCard = document.createElement("div");
    forecastCard.id = "forecast" + i;
    forecastCard.classList.add(
      "card",
      "bg-success",
      "text-light",
      "mb-2",
      "p-1"
    );

    var resultBody = document.createElement("div");
    resultBody.classList.add("card-body");

    var date = document.querySelector("#search-input").value;
    var futureDate = document.createElement("h3");

    var icon = document.createElement("img");
    icon.src =
      "http://openweathermap.org/img/wn/" +
      data.daily[i].weather[0].icon +
      ".png";

    var windSpeed = document.createElement("p");
    windSpeed.textContent = "Windspeed:" + data.daily[i].wind_speed + "mph";

    var temprature = document.createElement("p");
    temprature.textContent =
      "Temprature: Max " +
      data.daily[i].temp.max +
      "°F" +
      ", " +
      "Min " +
      data.daily[i].temp.min +
      "°F";

    var humidity = document.createElement("p");
    humidity.textContent = "Humidity:" + data.daily[i].humidity + "%";
    var date = new Date().getDate();
    var month = new Date().getMonth();
    futureDate.textContent = month + "/" + (date + i + 1);
    forecastCard.appendChild(futureDate);
    forecastCard.appendChild(icon);
    forecastCard.appendChild(temprature);
    forecastCard.appendChild(windSpeed);
    forecastCard.appendChild(humidity);
    //resultBody.appendChild(forecastCard);
    //fiveDay.appendChild(resultBody);
    fiveDay.appendChild(forecastCard);
  }
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

      showResults(data);
    });
}

function nuke() {
  currentDay.removeChild(currentDay.childNodes[0]);
  for (let i = 0; i < 5; i++) {
    console.log(i);
    fiveDay.removeChild(document.getElementById("forecast" + i));
  }
}

function loadText() {
  let history;
  searchInputVal = localStorage.getItem(maxStorage);
  maxStorage++;
  history = document.createElement("button");
  history.textContent = searchInputVal.toString();
  historyBox.appendChild(history);
  history.classList.add("history-btn");
  history.addEventListener("click", showResults(this));
}

searchBtn.addEventListener("click", function () {
  console.log(maxStorage);
  if (maxStorage > 1) {
    nuke();
  }
  console.log("i survived");
  let input = document.getElementById("search-input").value;
  console.log(input);
  localStorage.setItem(maxStorage, input);
});
