import { ChartConfiguration } from 'chart.js';

export const createDashboardWorkingCapitalChartConfig = (
  test: any[]
): ChartConfiguration<'line'> => {
  return {
    type: 'line',
    data: {
      labels: [
        'asd',
        'asd',
        'asd',
        'asd',
        'asd',
        'asd',
        'asd',
        'asd',
        'asd',
        'asd',
        'asd'
      ],
      datasets: [
        {
          label: 'Income',
          data: test.map((i) => i * 3),
          borderColor: '#29A073',
          backgroundColor: '#29A073',
          fill: false,
          tension: 0.5
        },
        {
          label: 'Expenses',
          data: test.map((i) => i * Math.random()),
          fill: false,
          borderColor: '#EB5757',
          backgroundColor: '#EB5757',
          tension: 0.5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false
      },
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          grid: {
            display: false
          },
          ticks: {
            maxTicksLimit: 5
          }
        }
      }
    }
  };
};
