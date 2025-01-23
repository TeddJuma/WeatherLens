export class UI {
  showLoading() {
    document.getElementById('current-weather-data').classList.add('loading');
    document.getElementById('forecast-data').classList.add('loading');
    document.getElementById('historical-data').classList.add('loading');
  }

  hideLoading() {
    document.getElementById('current-weather-data').classList.remove('loading');
    document.getElementById('forecast-data').classList.remove('loading');
    document.getElementById('historical-data').classList.remove('loading');
  }

  updateCurrentWeather(data) {
    const container = document.getElementById('current-weather-data');
    container.innerHTML = `
      <div class="weather-card animate-fade-in p-6">
        <h3 class="text-lg font-medium">${data.location.name}, ${data.location.country}</h3>
        <div class="flex items-center mt-2">
          <span class="temperature text-5xl font-bold">${data.current.temperature}°C</span>
          <img src="${data.current.weather_icons[0]}" alt="${data.current.weather_descriptions[0]}" class="w-12 h-12 ml-4">
        </div>
        <div class="mt-4 space-y-2 text-[var(--text-secondary)]">
          <p>Humidity: ${data.current.humidity}%</p>
          <p>Wind: ${data.current.wind_speed} km/h</p>
          <p>Pressure: ${data.current.pressure} mb</p>
        </div>
      </div>
    `;
  }

  updateForecast(data) {
    const container = document.getElementById('forecast-data');
    container.innerHTML = data.forecast.map(day => `
      <div class="weather-card animate-fade-in p-4">
        <div class="flex justify-between items-center">
          <span class="font-medium">${day.date}</span>
          <span class="temperature font-semibold">${day.temperature.max}°C / ${day.temperature.min}°C</span>
        </div>
        <p class="mt-2 text-[var(--text-secondary)]">${day.weather_descriptions[0]}</p>
      </div>
    `).join('');
  }

  showError(message) {
    // Implementation for error display
    console.error(message);
  }
}