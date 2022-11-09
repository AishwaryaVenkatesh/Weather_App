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
function getForecast(coordinates) {
  // let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiKey = "d346d9980b6a0b4e44b6600cc496e4ff";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
// //UPDATING CITY NAME
function displayWeather(response) {
  document.querySelector("#cityname").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#heading-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "d346d9980b6a0b4e44b6600cc496e4ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handlesubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#query");
  search(city.value);
}

let form = document.querySelector("#searchLocation");
form.addEventListener("submit", handlesubmit);

search("Vancouver");

function showPosition(positon) {
  let latitude = positon.coords.latitude;
  let longitude = positon.coords.longitude;
  let apiKey = "d346d9980b6a0b4e44b6600cc496e4ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

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
        `
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
             
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="42" />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}&deg;</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}&deg;</span>
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
