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
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let city = document.querySelector("#query").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let searchForm = document.querySelector("#searchLocation");
searchForm.addEventListener("submit", searchCity);

function showPosition(positon) {
  let latitude = positon.coords.latitude;
  let longitude = positon.coords.longitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

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
// searchCity("New York");
