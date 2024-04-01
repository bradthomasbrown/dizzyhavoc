import Chart from "../chart.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";

export default function BscChart() {
  if (!IS_BROWSER) return <></>;
  const darkmode = globalThis.matchMedia('(prefers-color-scheme: dark)').matches
  const isLoading = useSignal(true);
  const fetchedData = useSignal([]);
  const PriceHistory = async () => {
    try {
      const response = await fetch("https://quick-frog-59.deno.dev/v1/liveprices");
      const data = await response.json();
      fetchedData.value = data;
    } catch (error) {
      console.error(error);
    }
    isLoading.value = false;
  };
  useState(() => {
    PriceHistory();
  });

  const timestamps = fetchedData.value.map((item) =>
  new Date(item.timestamp).toLocaleTimeString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
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
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += context.parsed.y;
              return label;
            }
          },
          displayColors: false
        },
        title: {
          display: false,
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
        data: fetchedData.value.map((item) => item.bsc_price),
        borderColor: "#b8b8b8" , // set the color of the line
        pointRadius: 1, // Set the radius of the points
        borderWidth: 2, // Set the width of the line
        tension: 0.1,
      },
    ],
  };

  if(isLoading.value === true && fetchedData.value.length === 0){
    return (

      <img class="w-full sm:scale-100 scale-50 mx-[8rem] mt-7 sm:mt-0 sm:mx-[11rem] h-full" src="./misc/loader.svg"></img>
    );
  }
  if(isLoading.value === false){
    return (

      <>
         <div class="p-4 sm:mx-auto mx-4 mt-7 sm:mt-0 sm:h-[160px] sm:w-[430px] h-[100px] w-[330px]">
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
}
