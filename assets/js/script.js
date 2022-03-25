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
                let dateTwo = moment().add(2, 'days').format("L");
                let dayTwoDate = document.createElement('h4');
                dayTwoDate.setAttribute("class", "card-header text-light")
                dayTwoDate.textContent = dateTwo;
                dayTwoEl.appendChild(dayTwoDate);

                let dayTwoIcon = document.createElement('img');
                dayTwoIcon.setAttribute("class", "card-body");
                dayTwoIcon.setAttribute("id", "forecast-icon");
                dayTwoIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + dataTwo.daily[1].weather[0].icon + "@2x.png");
                dayTwoEl.appendChild(dayTwoIcon);

                let dayTwoTemp = document.createElement('span');
                dayTwoTemp.setAttribute("class", "card-body text-light");
                dayTwoTemp.textContent = 'Temp: '+ dataTwo.daily[1].temp.day;
                dayTwoEl.appendChild(dayTwoTemp);

                let dayTwoWind = document.createElement('span');
                dayTwoWind.setAttribute("class", "card-body text-light");
                dayTwoWind.textContent = 'Wind: '+ dataTwo.daily[1].wind_speed;
                dayTwoEl.appendChild(dayTwoWind);
                
                let dayTwoHumid = document.createElement('span');
                dayTwoHumid.setAttribute("class", "card-body text-light");
                dayTwoHumid.textContent = 'Humidity: '+ dataTwo.daily[1].humidity;
                dayTwoEl.appendChild(dayTwoHumid);
                // day 3
                let dateThree = moment().add(3, 'days').format("L");
                let dayThreeDate = document.createElement('h4');
                dayThreeDate.setAttribute("class", "card-header text-light")
                dayThreeDate.textContent = dateThree;
                dayThreeEl.appendChild(dayThreeDate);

                let dayThreeIcon = document.createElement('img');
                dayThreeIcon.setAttribute("class", "card-body");
                dayThreeIcon.setAttribute("id", "forecast-icon");
                dayThreeIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + dataTwo.daily[2].weather[0].icon + "@2x.png");
                dayThreeEl.appendChild(dayThreeIcon);

                let dayThreeTemp = document.createElement('span');
                dayThreeTemp.setAttribute("class", "card-body text-light");
                dayThreeTemp.textContent = 'Temp: '+ dataTwo.daily[2].temp.day;
                dayThreeEl.appendChild(dayThreeTemp);

                let dayThreeWind = document.createElement('span');
                dayThreeWind.setAttribute("class", "card-body text-light");
                dayThreeWind.textContent = 'Wind: '+ dataTwo.daily[2].wind_speed;
                dayThreeEl.appendChild(dayThreeWind);
                
                let dayThreeHumid = document.createElement('span');
                dayThreeHumid.setAttribute("class", "card-body text-light");
                dayThreeHumid.textContent = 'Humidity: '+ dataTwo.daily[2].humidity;
                dayThreeEl.appendChild(dayThreeHumid);
                // day 4
                let dateFour = moment().add(4, 'days').format("L");
                let dayFourDate = document.createElement('h4');
                dayFourDate.setAttribute("class", "card-header text-light")
                dayFourDate.textContent = dateFour;
                dayFourEl.appendChild(dayFourDate);

                let dayFourIcon = document.createElement('img');
                dayFourIcon.setAttribute("class", "card-body");
                dayFourIcon.setAttribute("id", "forecast-icon");
                dayFourIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + dataTwo.daily[3].weather[0].icon + "@2x.png");
                dayFourEl.appendChild(dayFourIcon);

                let dayFourTemp = document.createElement('span');
                dayFourTemp.setAttribute("class", "card-body text-light");
                dayFourTemp.textContent = 'Temp: '+ dataTwo.daily[3].temp.day;
                dayFourEl.appendChild(dayFourTemp);

                let dayFourWind = document.createElement('span');
                dayFourWind.setAttribute("class", "card-body text-light");
                dayFourWind.textContent = 'Wind: '+ dataTwo.daily[3].wind_speed;
                dayFourEl.appendChild(dayFourWind);
                
                let dayFourHumid = document.createElement('span');
                dayFourHumid.setAttribute("class", "card-body text-light");
                dayFourHumid.textContent = 'Humidity: '+ dataTwo.daily[3].humidity;
                dayFourEl.appendChild(dayFourHumid);
                // day 5
                let dateFive = moment().add(5, 'days').format("L");
                let dayFiveDate = document.createElement('h4');
                dayFiveDate.setAttribute("class", "card-header text-light")
                dayFiveDate.textContent = dateFive;
                dayFiveEl.appendChild(dayFiveDate);

                let dayFiveIcon = document.createElement('img');
                dayFiveIcon.setAttribute("class", "card-body");
                dayFiveIcon.setAttribute("id", "forecast-icon");
                dayFiveIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + dataTwo.daily[4].weather[0].icon + "@2x.png");
                dayFiveEl.appendChild(dayFiveIcon);

                let dayFiveTemp = document.createElement('span');
                dayFiveTemp.setAttribute("class", "card-body text-light");
                dayFiveTemp.textContent = 'Temp: '+ dataTwo.daily[4].temp.day;
                dayFiveEl.appendChild(dayFiveTemp);

                let dayFiveWind = document.createElement('span');
                dayFiveWind.setAttribute("class", "card-body text-light");
                dayFiveWind.textContent = 'Wind: '+ dataTwo.daily[4].wind_speed;
                dayFiveEl.appendChild(dayFiveWind);
                
                let dayFiveHumid = document.createElement('span');
                dayFiveHumid.setAttribute("class", "card-body text-light");
                dayFiveHumid.textContent = 'Humidity: '+ dataTwo.daily[4].humidity;
                dayFiveEl.appendChild(dayFiveHumid);
            })
        // append forecast info to day#El vars

        console.log(data);

        
    })
    

}; 