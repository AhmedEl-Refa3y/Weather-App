const apiKey = "09cde0eada7e6a433dccd9efa9a820d2";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      document.querySelector(".weather-icon").src = "images/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      document.querySelector(".weather-icon").src = "images/rain.png";
    } else if (data.weather[0].main == "Clear") {
      document.querySelector(".weather-icon").src = "images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      document.querySelector(".weather-icon").src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      document.querySelector(".weather-icon").src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  searchBox.value = "";
});

const searchInput = document.getElementById("search");
const suggestionsList = document.getElementById("search-suggestions");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();

  // Dummy data for demonstration; replace with API call if needed
  const suggestions = ["Berlin", "London", "Paris", "Cairo", "Tokyo", "New York"];

  if (query) {
    const filteredSuggestions = suggestions.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredSuggestions.length > 0) {
      suggestionsList.style.display = "block";
      suggestionsList.innerHTML = filteredSuggestions
        .map((city) => `<li>${city}</li>`)
        .join("");
    } else {
      suggestionsList.style.display = "none";
    }
  } else {
    suggestionsList.style.display = "none";
  }
});

// Handle click event for suggestions
suggestionsList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    searchInput.value = event.target.textContent;
    suggestionsList.style.display = "none";
  }
});
