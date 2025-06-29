const API_KEY = '3804b9010c96504d69fd3ee88d781b51'; 

const cityInput = document.getElementById('city-input');
const searchForm = document.querySelector('.search-form');
const tempEl = document.getElementById('temp');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const forecastEl = document.getElementById('forecast');

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    updateWeather(data);
  } catch (error) {
    alert('Error: ' + error.message);
    resetWeather();
  }
}

function updateWeather(data) {
  tempEl.textContent = `${Math.round(data.main.temp)}°C`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = `${Math.round(data.wind.speed)} km/h`;
  forecastEl.textContent = data.weather[0].main;
}

function resetWeather() {
  tempEl.textContent = '--';
  humidityEl.textContent = '--';
  windEl.textContent = '--';
  forecastEl.textContent = '--';
}

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});


