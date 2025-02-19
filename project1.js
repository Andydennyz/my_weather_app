//this codes covers how the app will run and change background in relation to the weather condition of the city searched using links
const apiKey = "de17941bb4946b7ebd9e6cf3ff71a259";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const loader = document.querySelector(".loader");
const weatherInfo = document.querySelector(".weather-info");
const cityNameDisplay = document.getElementById("city-name");
const temperatureDisplay = document.getElementById("temperature");
const humidityDisplay = document.getElementById("humidity");
const weatherDescriptionDisplay = document.getElementById("weather-description");

searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        getWeather(cityName);
    } else {
        alert("Please enter a city name!");
    }
});

async function getWeather(city) {
    loader.style.display = "block";
    weatherInfo.classList.remove("show");

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found!");
        }

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        alert(error.message);
    } finally {
        loader.style.display = "none";
    }
}

function updateWeatherUI(data) {
    cityNameDisplay.textContent = `${data.name}, ${data.sys.country}`;
    temperatureDisplay.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
    weatherDescriptionDisplay.textContent = `Weather: ${data.weather[0].description}`;

    weatherInfo.classList.add("show");
    changeBackground(data.weather[0].main);
}

function changeBackground(condition) {
    const videoElement = document.getElementById("background-video");
    const videoSource = document.getElementById("video-source");

    const weatherVideos = {
        "Clear": "4562023-hd_1040_1848_30fps.mp4",
        "Clouds": "16495-272487520_tiny.mp4",
        "Rain": "856281-hd_1920_1080_25fps.mp4",
        "Snow": "12370730_1080_1920_60fps.mp4",
        "Thunderstorm": "16495-272487520_tiny.mp4",
        "Mist": "856281-hd_1920_1080_25fps.mp4"
    };

    const newVideo = weatherVideos[condition] || "12370730_1080_1920_60fps.mp4";

    if (videoSource.getAttribute("src") !== newVideo) {
        videoSource.setAttribute("src", newVideo);
        videoElement.load();
        videoElement.play().catch(error => console.error("Autoplay failed:", error));
    }
}

window.onload = () => {
    const videoElement = document.getElementById("background-video");
    videoElement.play().catch(error => console.error("Autoplay failed:", error));
};
