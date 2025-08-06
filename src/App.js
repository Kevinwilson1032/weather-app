import React, { useState } from 'react';
import './App.css';

const API_KEY = "cf108f228498a59036ed10e2f6e373ad";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found!");
        setWeather(null);
      }
    } catch (error) {
      alert("Error fetching weather data.");
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>🌤️ Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].main} - {weather.weather[0].description}</p>
          <p>🌡️ Temp: {weather.main.temp} °C</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
