var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var APIkey = "&appid=847614a96bad4bae8518be6e90117639";

var searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", searchApi);
function searchApi() {
  var searchInputVal = document.querySelector("#search-input").value;
  fetch(weatherUrl + searchInputVal + ",us" + "&units=imperial" + APIkey)
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
