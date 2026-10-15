
const cityInput = document.getElementById("cityInput");  // cityInput  = user ne jo city dali hai UI pr , uske input box ka referrence store kr rha hai
const searchBtn = document.getElementById("searchBtn");  // searchbtn =  ye search button ka referrence store kr rha hai 
const message = document.getElementById("message");      // messege = ye UI pr dikhne vale msg ka referrence store kr rha hai 

const weather = document.getElementById("weather");      // ye div = weather ka refference store kr rha hai 
const cityName = document.getElementById("cityName");     
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");


function getWeatherCondition(code) {
    if (code === 0) {
        return "Clear Sky ☀️";
    } 
    else if (code === 1 || code === 2) {
        return "Partly Cloudy 🌤️";
    } 
    else if (code === 3) {
        return "Cloudy ☁️";
    } 
    else if (code >= 45 && code <= 48) {
        return "Foggy 🌫️";
    } 
    else if (code >= 51 && code <= 67) {
        return "Drizzle / Rain 🌧️";
    } 
    else if (code >= 71 && code <= 77) {
        return "Snowfall ❄️";
    } 
    else if (code >= 80 && code <= 82) {
        return "Rain Showers 🌦️";
    } 
    else if (code >= 95) {
        return "Thunderstorm ⛈️";
    } 
    else {
        return "Unknown Weather";
    }
}

searchBtn.addEventListener("click", async function () {

    const city = cityInput.value.trim();               // cityInput variable se jo value diya user ne use uthao aur aage-pichhe ke extra spaces ko trim kr do
        if (city === ""){
            message.textContent = "Please enter a city name";
            weather.classList.add("hidden");      // weather div ko hide kr do , aur 1st UI aa jayega mtlb fresh 
              return;
        }

    //geocoding API for finding the longitude and latitude bu name 
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;   // request beja 

    const response = await fetch(url);                                            // response aaya 
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        message.textContent = "City not found. Try another name.";
        weather.classList.add("hidden");
          return;
    }
    const location = data.results[0];
    const latitude = location.latitude;
    const longitude = location.longitude;

    console.log("City:", location.name);
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);




    const weatherUrl =`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();


    cityName.textContent = location.name;

    temperature.textContent = weatherData.current.temperature_2m + " °C";

    condition.textContent = getWeatherCondition(weatherData.current.weather_code);

    humidity.textContent = "Humidity: " + weatherData.current.relative_humidity_2m + "%";

    wind.textContent = "Wind Speed: " + weatherData.current.wind_speed_10m + " km/h";

    message.textContent = "";
    weather.classList.remove("hidden");


});
