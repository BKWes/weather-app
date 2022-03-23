// declare variables
const appId = 'cc2a72f395e0816b5bafe5bd96ddb5fd'
var citySearchEl = document.querySelector('#city');
var currentCityNameEl = document.querySelector('#currentCity');
var forecastEl = document.querySelector('#five-day-forecast');
var submitBtn = document.querySelector('button');
var fiveDay = document.querySelector('#five-day');
var iconEl = document.querySelector('#icon');
var cityName = null;
var city = null;
var date = moment().format("LL");

function formEventHandler(event) {
    event.preventDefault(); // prevent browser from refreshing on submit
    let city = citySearchEl.value.trim();
    if (city) {
        nameSearch();
    }
};

function nameSearch() {
    cityName = citySearchEl.value.toLowerCase().replace(/\s/g, '+');
    fetchApi(cityName);
};

submitBtn.addEventListener("click", formEventHandler);


function fetchApi(cityName) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=imperial&appid=' + appId;
    fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        currentCityNameEl.textContent = data.name + ' ' + date;
        iconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");

        return data;
        
    })
    

};