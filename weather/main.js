const apiKey = "a03d01a479e9e324ee9ed73e56a0028b"; // Replace with your API key
const search = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather() {
    const city = search.value.trim();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // Use backticks for template literals
   
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error("City not found"); // Handle errors if city is not found
        }

        const data = await response.json();
        console.log(data);
        
        document.querySelector(".city").innerHTML = data.name;

        // Convert temperature from Kelvin to Celsius
        const tempCelsius = Math.round(data.main.temp - 273.15);
        document.querySelector(".temp").innerHTML = tempCelsius + "°C";

        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Change the weather icon based on temperature
        if (tempCelsius < 0) {
            weatherIcon.src = "snow.png"; // Cold weather icon
        } else if (tempCelsius < 9) {
            weatherIcon.src = "rain.png"; // Rain weather icon
        } else if (tempCelsius <= 13) {
            weatherIcon.src = "drizzle.png"; // Drizzle weather icon
        } else if (tempCelsius <= 16) {
            weatherIcon.src = "clouds.png"; // Clouds weather icon
        } else if (tempCelsius < 22) {
            weatherIcon.src = "mist.png"; // Mist weather icon
        } else {
            weatherIcon.src = "clear.png"; // Clear weather icon
        }
    } catch (error) {
        console.error(error);
        alert(error.message); // Notify user of the error
    }
}

searchbtn.addEventListener("click", checkWeather);