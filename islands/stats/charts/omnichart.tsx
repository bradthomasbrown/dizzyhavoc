import Chart from "../chart.tsx";
import { ChartOptions } from "$fresh_charts/stats/ChartOption/MarketBar/chartOptions.tsx";
import { ChartOptions_M } from "$fresh_charts/stats/ChartOption/MarketBar/chartOptions-M.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal, useSignal } from "@preact/signals";
import { useState } from "preact/hooks";
import { cachedData } from "$fresh_charts/stats/Requests/caches/chartCache.tsx";
export function Omnichart(props: { chain: Signal<string> }) {
  if (!IS_BROWSER) return <></>;
  const { chain } = props;
  const data = cachedData;
  const fetchedData = useSignal([]);
  const isLoading = useSignal(true);
  const isMobile = globalThis.window.matchMedia("(pointer: coarse)").matches;
  const getCache = async () => {
    fetchedData.value = data;
    isLoading.value = false;
  };

  useState(() => {
    getCache();
  });

  const chartOptions = ChartOptions();
  const chartOptions_M = ChartOptions_M();

  const timestamps = fetchedData.value
    ? fetchedData.value.map((item) =>
        new Date(item.timestamp).toLocaleTimeString([], {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      )
    : undefined;

  const chartData = fetchedData.value
    ? {
        labels: timestamps,
        datasets: [
          {
            data: fetchedData.value.map((item) => {
              const prop = `${chain}_price`;
              return item[prop];
            }),
            borderColor: "#999999", // set the color of the line
            pointRadius: 0, // Set the radius of the points
            borderWidth: 3, // Set the width of the line
            tension: 0.1,
          },
        ],
      }
    : undefined;

  if (isLoading.value === false) {
    return (
      <>
        <div class="unselectable p-4 sm:mx-auto mx-4 mt-7 sm:mt-0 sm:h-[160px] sm:w-[430px] h-[100px] w-[calc(100vw-1.5rem)]">
          {fetchedData.value && fetchedData.value.length > 0 && (
            <Chart
              id="myChart"
              type="line"
              options={isMobile ? chartOptions_M : chartOptions}
              data={chartData}
            />
          )}
          {timestamps && (
            <>
              <p class="sm:text-[9px] text-[8px] font-[Poppins] dark:text-[#d2d2d27c] text-[#1a1a1ad6] absolute text-center left-[4.8rem] sm:left-[3.8rem] bottom-[14px] sm:bottom-2">
                {timestamps[0]}{" "}
              </p>
              <p class="sm:text-[9px] text-[8px] font-[Poppins] dark:text-[#d2d2d27c] text-[#1a1a1ad6] absolute text-center right-[2rem] sm:right-4 bottom-[14px] sm:bottom-2">
                {timestamps[timestamps.length - 1]}{" "}
              </p>
            </>
          )}
        </div>
      </>
    );
  }
}
