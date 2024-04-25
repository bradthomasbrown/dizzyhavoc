import { formatNumber } from "../../../common/formatNumber.tsx";
export function ChartOptions() {
  const Options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
      easing: 'easeInOutQuart',
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  ,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            label += context.parsed.y;
            return label==0 ? "no data yet" : "$"+formatNumber(label);
          },
        },
        displayColors: false,
      },
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
  };
  return Options;
}
