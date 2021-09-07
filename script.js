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
  currentCard.classList.add("card", "bg-primary", "text-light", "mb-2", "p-2");

  var resultBody = document.createElement("div");
  resultBody.classList.add("card-body");

  var date = document.querySelector("#search-input").value;
  var futureDate = document.createElement("h3");

  var icon = document.createElement("img");
  icon.src =
    "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";

  var windSpeed = document.createElement("p");
  windSpeed.textContent = "Windspeed:" + data.current.wind_speed + "mph";

  var temprature = document.createElement("p");
  temprature.textContent =
    "Temprature: Max " +
    data.current.temp +
    "°F" +
    ", " +
    "Feels like " +
    data.current.feels_like +
    "°F";
  var uvi = document.createElement("p");
  uvi.textContent = "UVI: " + data.current.uvi;
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

  resultBody.appendChild(currentCard);
  document.body.appendChild(currentCard);

  for (let i = 0; i <= 4; i++) {
    var forecastCard = document.createElement("div");
    forecastCard.classList.add(
      "card",
      "bg-success",
      "text-light",
      "mb-2",
      "p-2"
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
    //forecastCard.appendChild(resultBody);
    resultBody.appendChild(forecastCard);
    document.body.appendChild(forecastCard);
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
