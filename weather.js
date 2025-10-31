// const axios = require("axios");

// const apiKey = "26d0feef47bf72fcaf3b531867a25ec5";

// async function getWeather(city) {
//     try {
//         const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//         const response = await axios.get(url);
//         const data = response.data;

//         console.log(`🌤 Weather in ${data.name}, ${data.sys.country}:`);
//         console.log(`🌡 Temperature: ${data.main.temp}°C`);
//         console.log(`💨 Wind Speed: ${data.wind.speed} m/s`);
//         console.log(`☁ Condition: ${data.weather[0].description}`);
//     } catch (error) {
//         console.error("❌ Error fetching weather:", error.response ? error.response.statusText : error.message);
//     }
// }

// getWeather("Chennai");
// weather.js
const express = require("express");
const axios = require("axios");
const app = express();

// ✅ Your OpenWeather API key
const apiKey = "26d0feef47bf72fcaf3b531867a25ec5";

// ✅ Route: /weather/:city
app.get("/weather/:city", async (req, res) => {
  const { city } = req.params;
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;

    // ✅ JSON output
    res.json({
      city: data.name,
      country: data.sys.country,
      temperature: `${data.main.temp}°C`,
      condition: data.weather[0].description,
      windSpeed: `${data.wind.speed} m/s`,
    });
  } catch (error) {
    res.status(404).json({
      error: "❌ City not found or invalid API key",
    });
  }
});

// ✅ Render will use this port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌤 Server running on port ${PORT}`));


