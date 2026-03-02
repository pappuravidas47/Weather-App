const apiKey = "bbd228c3e993dd1da58049ce25b6f688";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){

    if(city === ""){
        alert("Enter city name first!");
        return;
    }

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    // ❗ sabse important fix
    if(response.status != 200){
        alert("City not found ❌");
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // weather icons
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value.trim());
});

// Enter key support
searchBox.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        checkWeather(searchBox.value.trim());
    }
});