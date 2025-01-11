import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly API_URL = 'https://api.open-meteo.com/v1/forecast'; // Open Meteo API URL

  // Function to fetch weather data based on latitude and longitude
  async getWeather(latitude: number, longitude: number) {
    try {
      const response = await axios.get(this.API_URL, {
        params: {
          latitude: latitude,
          longitude: longitude,
          hourly: 'temperature_2m,precipitation_probability,weather_code',
        },
      });

      if (response.data) {
        return response.data;
      } else {
        return { error: 'No weather data available for these coordinates' };
      }
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      return { error: 'Error fetching weather data' };
    }
  }
}
