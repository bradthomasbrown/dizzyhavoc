import Chart from "../chart.tsx";
import { ChartOptions } from "$fresh_charts/stats/chartOptions.tsx";
import { PriceHistory } from "$fresh_charts/stats/priceHistory.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";

export function ArbChart() {
  if (!IS_BROWSER) return <></>;
  const fetchedData = useSignal([]);
  const isLoading = useSignal(true);

  const getPrices = async () => {
    fetchedData.value = await PriceHistory();
    isLoading.value = false;
  };
  useState(() => {
    getPrices();
  });

  const chartOptions = ChartOptions();

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

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        data: fetchedData.value.map((item) => item.arb_price),
        borderColor: "#999999", // set the color of the line
        pointRadius: 1, // Set the radius of the points
        borderWidth: 2, // Set the width of the line
        tension: 0.1,
      },
    ],
  };

  if (isLoading.value === true && fetchedData.value.length === 0) {
    return (
      <img
        class="w-full sm:scale-100 scale-50 mx-[8rem] mt-7 sm:mt-0 sm:mx-[11rem] h-full"
        src="./misc/loader.svg"
      >
      </img>
    );
  }
  if (isLoading.value === false) {
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
