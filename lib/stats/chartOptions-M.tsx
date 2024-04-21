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
        ticks: {
          stepSize: 0.01,
        },

        border: {
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
            return "$"+label;
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
