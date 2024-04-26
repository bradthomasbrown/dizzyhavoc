import Chart from "../chart.tsx";
import { ChartOptions } from "$fresh_charts/stats/ChartOption/Average-Liquidity-MkCap/chartOptions.tsx";
import { ChartOptions_M } from "$fresh_charts/stats/ChartOption/Average-Liquidity-MkCap/chartOptions-M.tsx";
import { Average_Weekly } from "$fresh_charts/stats/Requests/Average.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";

export function Average() {
  if (!IS_BROWSER) return <></>;
  const fetchedData = useSignal([]);
  const isLoading = useSignal(true);
  const isMobile = globalThis.window.matchMedia("(pointer: coarse)").matches
  const firstdate = useSignal<string>("00/00/0000");
  const lastdate = useSignal<string>("00/00/0000");
  const getPrices = async () => {
    const data = await Average_Weekly();
    const weeklyData = Array.from({ length: 52 }, (_, i) => {
      if (i < data.length) {
        const { timestamp, averageprice } = data[i];
        return { timestamp, averageprice };
      } else {
        return { timestamp: data[data.length-1].timestamp + (i * 604800000), averageprice: 0 };
      }
    });
    fetchedData.value = weeklyData;
    const timedate = new Date(fetchedData.value[0].timestamp).toLocaleDateString()
    const timedate2 = new Date(fetchedData.value[fetchedData.value.length-1].timestamp).toLocaleDateString()
    firstdate.value = timedate
    lastdate.value = timedate2
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
        data: fetchedData.value.map((item) => item.averageprice),
        backgroundColor: "#707070", // set the color of the line
        barThickness: 2,
        maxBarThickness: 2,
      },
    ],
  };


    return (
      <>
       <p class="font-[Poppins] text-[12px] dark:text-[#d0d0d0] text-[#3d3d3d] unselectable text-center italic pl-1 absolute">Weekly Average Price</p>
       <p class="font-[Poppins] text-[8px] dark:text-[#d0d0d0] text-[#3d3d3d] vignets unselectable text-center absolute top-[2px] right-1">{firstdate +" > "+ lastdate}</p>
       <div class="unselectable vignets absolute -bottom-1 sm:h-[110px] sm:w-[455px] h-[85px] w-[345px]">
          {fetchedData.value && fetchedData.value.length > 0 && (
            <Chart
              type="bar"
              options={isMobile ? chartOptions_M : chartOptions}
              data={chartData}
            />
          )}
        </div>
      </>
    );
  
}
