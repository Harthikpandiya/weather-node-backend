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
// weather.jsconst express = require("express");
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Root route (to avoid Cannot GET /)
app.get("/", (req, res) => {
  res.send("🌤 Weather API backend is running successfully!");
});

// ✅ Weather route
app.get("/weather", async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ error: "City name is required" });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    // If OpenWeather API gives an error
    if (data.cod !== 200) {
      return res.status(404).json({ error: data.message });
    }

    res.json({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🌤 Server running on port ${PORT}`);
});










