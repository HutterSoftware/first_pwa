// This function will execute, if the user hit the button
function updateWeatherData() {
    // Validate GPS support of the browser
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        // Throw this message, if the browser does not support GPS
        alert("Geolocation is not supported by this browser.");
    }
}

// This function will be start, if the command navigator.geolocation.getCurrentPosition(showPosition) in line 5 are executed
function showPosition(position) {
    // Get latitude and longitude
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    // Set longitude and latitude in the DOM
    document.getElementById("long").innerText = "longitude: " + longitude;
    document.getElementById("lati").innerText = "latitude: " + latitude;

    // Get Current date 
    var date = new Date();
    var hour = date.getHours();

    // Create time string YYYY-MM-DD from standard ISO 8601 
    var dateString = String(date.getYear() + 1900) + "-" + String(date.getMonth()) + "-" + String(date.getDate());
    var apiUrl = "https://api.brightsky.dev/weather?lat=" + String(latitude) + "&lon=" + String(longitude) + "&date=" + dateString;

    // Create HTTP Request to the weather API https://api.brightsky.dev
    requester = new XMLHttpRequest();
    requester.onreadystatechange = function () {
        // If response is finished, update the weather data in the DOM
        if (this.readyState === 4 && this.status === 200) {
            var weatherData = JSON.parse(this.responseText);
            currentData = weatherData["weather"][hour];
            document.getElementById("temp").innerText = currentData["temperature"];
            document.getElementById("condition").innerText = currentData["condition"];
            document.getElementById("pressure").innerText = currentData["pressure_msl"];
            document.getElementById("humidity").innerText = currentData["relative_humidity"];
            document.getElementById("wind-speed").innerText = currentData["wind_speed"];
        }
    };

    // Start request to API
    requester.open("GET", apiUrl, true);
    requester.send();
}