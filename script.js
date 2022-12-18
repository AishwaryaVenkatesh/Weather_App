//UPDATING CURRENT TIME
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let todaysDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
let displayTime = document.querySelector("#datetime");
displayTime.innerHTML = `${todaysDay}, ${currentHour}:${currentMinute}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function getEmojiFromIconCode(iconCode) {
  const codeMap = {
    "clear-sky-day": "🌞",
    "few-clouds-day": "🌤",
    "scattered-clouds-day": "⛅",
    "broken-clouds-day": "☁",
    "shower-rain-day": "🌦",
    "rain-day": "🌧",
    "thunderstorm-day": "⛈",
    "snow-day": "🥶",
    "mist-day": "🌫",
    "clear-sky-night": "🌞",
    "few-clouds-night": "🌤",
    "scattered-clouds-night": "⛅",
    "broken-clouds-night": "☁",
    "shower-rain-night": "🌦",
    "rain-night": "🌧",
    "thunderstorm-night": "⛈",
    "snow-night": "🥶",
    "mist-night": "🌫",
  };

  return codeMap[iconCode];
}

function getForecast(cityInput) {
  let apiKey = "aa0eaatd7f357dof3433b25a3dc8a2f5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
// //UPDATING CITY NAME
function displayWeather(response) {
  document.querySelector("#cityname").innerHTML = response.data.city;
  celsiusTemperature = response.data.temperature.day;
  document.querySelector("#heading-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}@2x.png`
    );
  getForecast(response.data.city);
}

function searchCity(cityInput) {
  let apiKey = "aa0eaatd7f357dof3433b25a3dc8a2f5";
  let apiUrl =
    "https://api.shecodes.io/weather/v1/current?query=" +
    cityInput +
    "&key=" +
    apiKey +
    "&units=imperial";

  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#query").value;
  searchCity(cityInput);
}

let form = document.querySelector("#searchLocation");
form.addEventListener("submit", search);

searchCity("Vancouver");

function showPosition(position) {
  let apiKey = "aa0eaatd7f357dof3433b25a3dc8a2f5";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

//FORECAST

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.time
              )}</div>
             
              <div class="icon" id="icon"> ${getEmojiFromIconCode(
                forecastDay.condition.icon
              )} </div>
              <div class="weather-forecast-temperatures">
                ${Math.round(forecastDay.temperature.day)}&deg;
                </div>
                
              </div>
            </div>
        
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// SWITCHING TEMP FROM C TO F

function changeToF(event) {
  event.preventDefault();
  let searchTemperature = document.querySelector("#heading-temperature");

  tempCelsius.classList.remove("active");
  tempFarenheit.classList.add("active");

  let tempInF = celsiusTemperature * 1.8 + 32;
  searchTemperature.innerHTML = Math.round(tempInF);
}
celsiusTemperature = null;

let tempFarenheit = document.querySelector("#fahrenheit");
tempFarenheit.addEventListener("click", changeToF);

function changeToC(event) {
  event.preventDefault();
  let searchTemperature = document.querySelector("#heading-temperature");

  tempCelsius.classList.add("active");
  tempFarenheit.classList.remove("active");

  searchTemperature.innerHTML = Math.round(celsiusTemperature);
}

celsiusTemperature = null;

let tempCelsius = document.querySelector("#celsius");
tempCelsius.addEventListener("click", changeToC);
