import { WeatherAPI } from './weatherAPI.js';
import { UI } from './ui.js';
import { ChartManager } from './chart.js';

class App {
  constructor() {
    this.api = new WeatherAPI();
    this.ui = new UI();
    this.chart = new ChartManager();
    
    this.init();
  }

  init() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      this.setTheme(newTheme);
    });

    // Search functionality
    document.getElementById('search-btn').addEventListener('click', () => {
      this.handleSearch();
    });

    document.getElementById('location-search').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSearch();
      }
    });

    // Load default location
    this.loadWeatherData('Nairobi');
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateThemeIcon(theme);
    
    // Update chart colors when theme changes
    if (this.chart) {
      this.chart.initChartTheme();
      if (this.chart.chartInstance) {
        this.chart.chartInstance.update();
      }
    }
  }

  updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.innerHTML = theme === 'light' 
      ? `<svg class="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
         </svg>`
      : `<svg class="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
         </svg>`;
  }

  async handleSearch() {
    const location = document.getElementById('location-search').value;
    if (location) {
      await this.loadWeatherData(location);
    }
  }

  async loadWeatherData(location) {
    try {
        this.ui.showLoading();

        // Fetch all weather data
        const current = await this.api.getCurrentWeather(location);
        const forecast = await this.api.getForecast(location);
        const historical = await this.api.getHistoricalData(location);

        console.log("Forecast:", forecast);

        // Update Current weather
        this.ui.updateCurrentWeather(current);
        this.ui.hideLoading_cw();  
 
        // Update Forecast data
        this.ui.updateForecast(forecast);
        this.ui.hideLoading_fd(); 

        // Update Historical data
        this.chart.updateHistoricalChart(historical);
        this.ui.hideLoading_hd(); 

        // this.ui.hideLoading(); 

    } catch (error) {
        this.ui.showError(error.message);
    }
}

}

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
  new App();
});