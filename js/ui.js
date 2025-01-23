export class UI {
  showLoading() {
    document.getElementById('current-weather-data').classList.add('loading');
    document.getElementById('forecast-data').classList.add('loading');
    document.getElementById('historical-data').classList.add('loading');
  }

  hideLoading_cw() {
    document.getElementById('current-weather-data').classList.remove('loading');
  }

  hideLoading_fd() {
    document.getElementById('forecast-data').classList.remove('loading');
  }

  hideLoading_hd() {
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
    
    // Clear previous content
    container.innerHTML = '';

    // Get tomorrow's date
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowDateString = tomorrow.toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Get tomorrow's forecast
    const tomorrowForecast = data.forecast[tomorrowDateString];

    // Get the next three days' forecasts
    const nextThreeDaysForecast = Object.keys(data.forecast)
        .slice(1, 4) // Get the next three days after today
        .map(date => data.forecast[date]);

    // Create a prominent display for tomorrow's forecast
    const tomorrowCard = `
      <div class="weather-card animate-fade-in p-4 prominent">
        <div class="flex justify-between items-center">
          <span class="font-medium">${data.location.name} - Tomorrow</span>
          <span class="temperature font-semibold">${tomorrowForecast.maxtemp}°C / ${tomorrowForecast.mintemp}°C</span>
        </div>
        <p class="mt-2 text-[var(--text-secondary)]">${tomorrowForecast.weather_descriptions[0]}</p>
      </div>
    `;

    // Create a less prominent display for the next three days' forecasts
    const nextThreeDaysCards = nextThreeDaysForecast.map(day => `
      <div class="weather-card animate-fade-in p-2 less-prominent">
        <div class="flex justify-between items-center">
          <span class="font-medium">${data.location.name} - ${day.date}</span>
          <span class="temperature font-semibold">${day.maxtemp}°C / ${day.mintemp}°C</span>
        </div>
        <p class="mt-1 text-[var(--text-secondary)]">${day.weather_descriptions[0]}</p>
      </div>
    `).join('');

    // Combine both sections and update the container
    container.innerHTML = tomorrowCard + nextThreeDaysCards;
}


  showError(message) {
    // Implementation for error display
    console.error(message);
  }
}