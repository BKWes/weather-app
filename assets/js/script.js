// declare variables
const appId = 'cc2a72f395e0816b5bafe5bd96ddb5fd'
var citySearchEl = document.querySelector('#city');
var currentCityNameEl = document.querySelector('#currentCity');
var submitBtn = document.querySelector('button');
var fiveDay = document.querySelector('#five-day');
let currentWeatherEl = document.querySelector('#todayBody');
let dayOneEl = document.querySelector('#day1');
let dayTwoEl = document.querySelector('#day2');
let dayThreeEl = document.querySelector('#day3');
let dayFourEl = document.querySelector('#day4');
let dayFiveEl = document.querySelector('#day5');
let iconEl = null;
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
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=imperial&exclude=daily&appid=' + appId;
    fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        currentCityNameEl.textContent = '';
        currentWeatherEl.innerHTML = '';
        // change current city name
        currentCityNameEl.textContent = data.name + ' ' + date;
        // create icon and append to html
        iconEl = document.createElement('img');
        iconEl.setAttribute("class", "card-header");
        iconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
        currentCityNameEl.append(iconEl);
        // create todays weather - append to currentWeatherEl
        // current temp
        var currentTemp = document.createElement('p');
        currentTemp.setAttribute("class", "text-light bg-dark");
        currentTemp.textContent = "Temp: "+data.main.temp;
        currentWeatherEl.appendChild(currentTemp);
        // current wind
        var currentWind = document.createElement('p');
        currentWind.setAttribute("class", "text-light bg-dark");
        currentWind.textContent = "Wind: "+data.wind.speed;
        currentWeatherEl.appendChild(currentWind);
        // current humidity
        var currentHumid = document.createElement('p');
        currentHumid.setAttribute("class", "text-light bg-dark");
        currentHumid.textContent = "Humidity: "+data.main.humidity;
        currentWeatherEl.appendChild(currentHumid);
        // get coordinates for forecast
        let latCoord = data.coord.lat;
        let lonCoord = data.coord.lon;
        let forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+latCoord+"&lon="+lonCoord+"&units=imperial&exclude=minutely,hourly,alerts&appid="+appId;
        fetch(forecastUrl)
            .then(function(responseTwo) {
                return responseTwo.json()
            })
            .then(function(dataTwo) {
                console.log(dataTwo);
// use a for loop to consolidate days???
                // day 1
                let dateOne = moment().add(1, 'days').format("L");
                let dayOneDate = document.createElement('h4');
                dayOneDate.setAttribute("class", "card-header text-light")
                dayOneDate.textContent = dateOne;
                dayOneEl.appendChild(dayOneDate);

                let dayOneIcon = document.createElement('img');
                dayOneIcon.setAttribute("class", "card-body");
                dayOneIcon.setAttribute("id", "forecast-icon");
                dayOneIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + dataTwo.daily[0].weather[0].icon + "@2x.png");
                dayOneEl.appendChild(dayOneIcon);

                let dayOneTemp = document.createElement('span');
                dayOneTemp.setAttribute("class", "card-body text-light");
                dayOneTemp.textContent = 'Temp: '+ dataTwo.daily[0].temp.day;
                dayOneEl.appendChild(dayOneTemp);

                let dayOneWind = document.createElement('span');
                dayOneWind.setAttribute("class", "card-body text-light");
                dayOneWind.textContent = 'Wind: '+ dataTwo.daily[0].wind_speed;
                dayOneEl.appendChild(dayOneWind);
                
                let dayOneHumid = document.createElement('span');
                dayOneHumid.setAttribute("class", "card-body text-light");
                dayOneHumid.textContent = 'Humidity: '+ dataTwo.daily[0].humidity;
                dayOneEl.appendChild(dayOneHumid);
                // day 2

                // day 3

                // day 4

                // day 5
            })
        // append forecast info to day#El vars

        console.log(data);

        
    })
    

}; 