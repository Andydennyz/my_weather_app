const apiKey = "de17941bb4946b7ebd9e6cf3ff71a259";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");

searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value;
    if (cityName) {
        getWeather(cityName);
    } else {
        alert("Please enter a city name!");
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateUI(data) {
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
}

