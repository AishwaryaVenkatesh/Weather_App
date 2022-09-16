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
  document.querySelector("#heading-temperature").innerHTML = Math.round(
    response.data.main.temp
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
searchForm.addEventListener("click", searchCity);

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

//SWITCHING TEMP FROM C TO F

// function changeToF() {
//   let temperature = document.querySelector(".heading-temperature");
//   let tempInF = 17 * 1.8 + 32;
//   temperature.innerHTML = tempInF;
// }
// let tempfarenheit = document.querySelector(".fahrenheit");
// tempfarenheit.addEventListener("click", changeToF);

// function changeToC() {
//   let temperature = document.querySelector(".heading-temperature");
//   let tempInC = 17;
//   temperature.innerHTML = tempInC;
// }
// let tempCelsius = document.querySelector(".celsius");
// tempCelsius.addEventListener("click", changeToC);
