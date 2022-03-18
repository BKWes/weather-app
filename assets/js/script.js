// declare variables
var citySearchEl = document.querySelector('#city');
var weatherEl = document.querySelector('#weather-container');
var forecastEl = document.querySelector('#five-day-forecast');
var submitBtn = document.querySelector('button');


var formEventHandler = function(event) {
    event.preventDefault(); // prevent browser from refreshing on submit
    let city = citySearchEl.value.trim();
    console.log(city);
};

submitBtn.addEventListener("click", formEventHandler);

var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=cc2a72f395e0816b5bafe5bd96ddb5fd';

fetch(apiUrl)
.then(function(response) {
    console.log(response);
    return response.json();
})
.then(function(data) {
    console.log(data);
})