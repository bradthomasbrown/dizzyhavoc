import Chart from "../chart.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";

export default function AvaxChart() {
  if (!IS_BROWSER) return <></>;
  const fetchedData = useSignal([]);
  const PriceHistory = async () => {
    try {
      const response = await fetch("https://empty-bison-39-ywvq84e34ftd.deno.dev/v1/liveprices");
      const data = await response.json();
      fetchedData.value = data;
    } catch (error) {
      console.error(error);
    }
  };
  useState(() => {
    PriceHistory();
    setInterval(() => {
      PriceHistory();
    }, 60000); // Update every 5 seconds
  });

  const timestamps = fetchedData.value.map((item) =>
    new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks : {
          display: false,
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks:{
          stepSize: 0.01
        },

        border: {
          display: false,
        },
      },
    },
    plugins: {
        tooltip: {
            callbacks: {
              label: function(context) {
                var label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += context.parsed.y;
                return label;
              }
            }
          },
      legend: {
        display: false,
      },
    },
  };
  
  const chartData = {
    labels: timestamps,
    datasets: [
      {
        data: fetchedData.value.map((item) => item.avax_price),
        borderColor: "#b8b8b8", // set the color of the line
        pointRadius: 1, // Set the radius of the points
        borderWidth: 4, // Set the width of the line
        tension: 0.5,
      },
    ],
  };

  return (
    <>
      <div class="p-4 sm:mx-auto mx-4 mt-7 sm:mt-0 sm:h-[160px] sm:w-[400px] h-[100px] w-[300px]">
        {fetchedData.value && fetchedData.value.length > 0 && (
         <Chart
         id="myChart"
         type="line"
         options={chartOptions}
         data={chartData}
       />
        )}
      </div>
    </>
  );
}
