var geoCodingUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
var oneCall = "https://api.openweathermap.org/data/2.5/onecall?";
var APIkey = "&appid=2bc1f0b51ed045438d94380043507d78";
var exclude = "&exclude=hourly,minutely,alerts";
var fiveDay = document.getElementById("five-day");
var container = document.getElementById("container");
var currentDay = document.getElementById("current-day");
var historyBox = document.getElementById("history-box");
var searchBtn = document.querySelector(".search-btn");
var hasSearched = false;
var searchInputVal = document.querySelector("#search-input").value;
let maxStorage = 0;
searchBtn.addEventListener("click", searchBtnCallBack);

//takes input from search input from search-input an enters it into the geocodingAPI url
//gets lat and lon and feeds that to search one call
function searchGeo(searchInputVal) {
  fetch(geoCodingUrl + searchInputVal + ",us" + "&units=imperial" + APIkey)
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let lat = data[0].lat;
      let lon = data[0].lon;
      console.log(lat, lon);
      searchOneCall(lat, lon);
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
    fiveDay.appendChild(forecastCard);
  }
}
//takes at and long a puts that into the onecall url and feeds the city name into show results
function searchOneCall(lat, lon) {
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
//clears previously displayed weather cards or "nukes" them by removing child nodes
function nuke() {
  currentDay.removeChild(currentDay.childNodes[0]);
  for (let i = 0; i < 5; i++) {
    fiveDay.removeChild(document.getElementById("forecast" + i));
  }
}
//creates search history buttons with search history input as its text and value.
//adds history-btn class to each of those buttons
//adds an event listener to each of the created buttons and checks if there is any search history if there is any nuke it
//sets has searched to true so that code knows that searches have been done.
//then passes buttun value into seaarch geo
function createHistoryBtn(searchInputVal) {
  maxStorage++;
  let history = document.createElement("button");
  history.textContent = searchInputVal;
  history.value = searchInputVal;
  historyBox.appendChild(history);
  history.classList.add("history-btn");
  history.addEventListener("click", function (event) {
    var btnValue = event.target.value;
    if (hasSearched) {
      nuke();
    }
    hasSearched = true;
    searchGeo(btnValue);
  });
}

//gets info from local storage and recreates buttons with their textContent and value
//loops through local storage creating buttons with values from localstorage
function loadLocalStorage() {
  var storageLength = Object.keys(localStorage).length;
  if (storageLength > 0) {
    maxStorage = storageLength + 1;
    for (var i = 0; i < storageLength; i++) {
      var btnValue = localStorage.getItem(i);
      createHistoryBtn(btnValue);
    }
  }
}
//creates search history button and nukes previous cards
//sets search input into local storage
//creates historyBtn
//and searchs geo
function searchBtnCallBack() {
  if (hasSearched) {
    nuke();
  }
  let input = document.getElementById("search-input").value;
  localStorage.setItem(maxStorage, input);
  var search = document.querySelector("#search-input").value;
  searchGeo(search);
  createHistoryBtn(search);
  hasSearched = true;
}
loadLocalStorage();
