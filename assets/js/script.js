// declare variables
const appId = 'cc2a72f395e0816b5bafe5bd96ddb5fd'
var citySearchEl = document.querySelector('#city');
var weatherEl = document.querySelector('#weather-container');
var forecastEl = document.querySelector('#five-day-forecast');
var submitBtn = document.querySelector('button');
var cityName = null
var city = [];

var formEventHandler = function(event) {
    event.preventDefault(); // prevent browser from refreshing on submit
    let city = citySearchEl.value.trim();
    if (city) {
        nameSearch();
    }
};
function nameSearch() {
    cityName = citySearchEl.value.toLowerCase().replace(/\s/g, '+');
    cityWeather(cityName);
}

var cityWeather = function(cityName) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=imperial&appid=' + appId;
    fetch(apiUrl)
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data) {
        console.log(data, cityName);
    })
};

submitBtn.addEventListener("click", formEventHandler);



