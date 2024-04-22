import Chart from "../chart.tsx";
import { ChartOptions } from "$fresh_charts/stats/Liquidity/chartOptions.tsx";
import { ChartOptions_M } from "$fresh_charts/stats/Liquidity/chartOptions-M.tsx";
import { Liquidity_Weekly } from "$fresh_charts/stats/Liquidity.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";

export function Liquidity() {
  if (!IS_BROWSER) return <></>;
  const fetchedData = useSignal([]);
  const isLoading = useSignal(true);
  const isMobile = globalThis.window.matchMedia("(pointer: coarse)").matches
  const getPrices = async () => {
    fetchedData.value = await Liquidity_Weekly();
    isLoading.value = false;
  };
  useState(() => {
    getPrices();
  });

  const chartOptions = ChartOptions();
  const chartOptions_M = ChartOptions_M();
  const timestamps = fetchedData.value.map((item) =>
    new Date(item.timestamp).toLocaleTimeString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        data: fetchedData.value.map((item) => item.liq),
        backgroundColor: "#707070", // set the color of the line
        barThickness: 2,
        maxBarThickness: 2,
        
      },
    ],
  };

  if (isLoading.value === false) {
    return (
      <>
        <div class="unselectable p-4 sm:mx-auto mx-4 mt-7 sm:mt-0 sm:h-[160px] sm:w-[430px] h-[100px] w-[330px]">
          {fetchedData.value && fetchedData.value.length > 0 && (
            <Chart
              id="myChart"
              type="bar"
              options={isMobile ? chartOptions_M : chartOptions}
              data={chartData}
            />
          )}
        </div>
      </>
    );
  }
}
