export class ChartManager {
  constructor() {
    this.chartInstance = null;
    this.initChartTheme();
  }

  initChartTheme() {
    window.Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
    window.Chart.defaults.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
  }

  updateHistoricalChart(data) {
    // Update chart colors based on current theme
    this.initChartTheme();
    
    const ctx = document.getElementById('historical-chart').getContext('2d');
    
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: data.historical.map(day => day.date),
        datasets: [{
          label: 'Temperature °C',
          data: data.historical.map(day => day.temperature),
          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--accent-color'),
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Temperature History'
          }
        },
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
}