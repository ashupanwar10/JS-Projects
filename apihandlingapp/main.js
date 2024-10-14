document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("search-btn");

    const weatherInfo = document.getElementById("weather-info");
    const city = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    London;
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "this-is-api-key-here";

    getWeatherBtn.addEventListener("click", async function () {
        const cityName = cityInput.value.trim();

        if (!cityName) {
            errorMessage.innerText = "Please enter a city name";
            showErrorMessage();
            return;
        }

        try {
            await fetchWeatherData(cityName);
        } catch (error) {
            showErrorMessage(
                "An error occurred while fetching the weather data"
            );
        }
    });

    async function fetchWeatherData(cityName) {
        // TODO: Fetch weather data from the OpenWeather API

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);

        if (!response.ok || response.status === 404) {
            errorMessage.innerText =
                "Unable to find the city. Please try again.";
            showErrorMessage();
            return;
        }

        const weatherData = await response.json();
        displayWeatherData(weatherData);
    }

    function displayWeatherData(weatherData) {
        // TODO: Display the weather data on the page
        const { name, main, weather } = weatherData;

        console.log(weatherData);

        city.innerText = name;
        temperature.innerText = `Temperature: ${main.temp}°C`;
        description.innerText = `Description: ${weather[0].description}`;

        // remove hidden class
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
    }

    function showErrorMessage() {
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
});
