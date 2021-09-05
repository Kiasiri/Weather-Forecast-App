var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var APIkey = "&appid=847614a96bad4bae8518be6e90117639";
var searchInputVal = document.querySelector("#search-input").value;
var searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", searchApi);
searchApi();
function searchApi() {
  fetch(weatherUrl + "New York,us" + APIkey)
    //.then(function (response) {
    .then((response) => {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
    });
}
