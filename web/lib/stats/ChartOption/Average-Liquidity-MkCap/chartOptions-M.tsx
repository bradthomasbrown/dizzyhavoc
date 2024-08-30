import { formatNumber } from "../../../common/formatNumber.tsx";
export function ChartOptions_M() {
  const Options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
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
        ticks:{
          callback: function (value) {
            return "$"+formatNumber(value);
          },
        }
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
            return "$"+formatNumber(label);
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
      labels: {
        display: false,
      },
    },
  };
  return Options;
}