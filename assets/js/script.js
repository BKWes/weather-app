var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={optional}&appid=cc2a72f395e0816b5bafe5bd96ddb5fd';

fetch(apiUrl)
.then(function(response) {
    console.log(response);
    return response.json();
})
.then(function(data) {
    console.log(data);
})