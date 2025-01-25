import config from "./config.js";

export class WeatherAPI {
  constructor() {
    this.apiKey = config.API_KEY;
    this.baseUrl = 'https://api.weatherstack.com';
  }

  async getCurrentWeather(location) {
    const response = await fetch(
      `${this.baseUrl}/current?access_key=${this.apiKey}&query=${location}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch current weather data');
    }

    return await response.json();
  }

  async getForecast(location) {
    const response = await fetch(
      `${this.baseUrl}/forecast?access_key=${this.apiKey}&query=${location}&forecast_days=14`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
        }
        
    return await response.json();
  }

  async getHistoricalData(location) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const response = await fetch(
      `${this.baseUrl}/historical?access_key=${this.apiKey}&query=${location}&historical_date_start=${startDate.toISOString().split('T')[0]}&historical_date_end=${endDate.toISOString().split('T')[0]}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch historical data');
    }

    return await response.json();
  }
}