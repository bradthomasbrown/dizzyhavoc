import Chart from "../stats/chart.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";

export default function ChartIsland() {
  if (!IS_BROWSER) return <></>;

  const fetchedData = useSignal([]);

  const PriceHistory = async () => {
    try {
      const response = await fetch("https://irepiikscm.us-east-1.awsapprunner.com/v1/liveprices");
      const data = await response.json();
      fetchedData.value = data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    PriceHistory();
    setInterval(() => {
      PriceHistory();
    }, 60000);
  });

  const timestamps = fetchedData.value.map((item) =>
    new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  );

  return (
    <>
      <div class="p-4 mx-auto max-w-screen-md">
        {fetchedData.value && fetchedData.value.length > 0 && (
          <Chart
            type="line"
            data={{
              labels: timestamps,
              datasets: [
                {
                  label: "Eth Price",
                  data: fetchedData.value.map((item) => item.eth_price),
                },
                {
                  label: "Arb Price",
                  data: fetchedData.value.map((item) => item.arb_price),
                },
                {
                  label: "Avax Price",
                  data: fetchedData.value.map((item) => item.avax_price),
                },
                {
                  label: "Bsc Price",
                  data: fetchedData.value.map((item) => item.bsc_price),
                },
                {
                  label: "Base Price",
                  data: fetchedData.value.map((item) => item.base_price),
                }
              ],
            }}
          />
        )}
      </div>
    </>
  );
}