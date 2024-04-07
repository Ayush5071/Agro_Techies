import express from "express";



const weatherApi = async (req, res) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=kanpur&appid=${process.env.WEATHER}&units=metric`);
        const data = await response.json();
  
        const {
            name: cityName,
            main: { temp: temperature, feels_like: feelsLike, humidity },
            weather,
            wind: { speed: windSpeed },
            visibility,
            sys: { sunrise, sunset },
            main: { pressure }
        } = data;
  
        const weatherInfo = {
            city: cityName,
            temperature: temperature,
            feelsLike: feelsLike,
            description: weather[0].description,
            humidity: humidity,
            windSpeed: windSpeed,
            pressure: pressure,
            visibility: visibility,
            sunrise: new Date(sunrise * 1000).toLocaleTimeString('en-US'),
            sunset: new Date(sunset * 1000).toLocaleTimeString('en-US')
        };
  
        res.json(weatherInfo);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
export {weatherApi}