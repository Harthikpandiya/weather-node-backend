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
const express = require("express");
const axios = require("axios");
const app = express();
const apiKey = "26d0feef47bf72fcaf3b531867a25ec5";

app.get("/weather/:city", async (req, res) => {
  const { city } = req.params;
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const { data } = await axios.get(url);
    res.json({
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      wind: data.wind.speed
    });
  } catch (err) {
    res.status(400).json({ error: "City not found" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
