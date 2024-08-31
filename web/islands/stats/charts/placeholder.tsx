import Chart from "../chart.tsx";
import { ChartOptions_M } from "$fresh_charts/stats/ChartOption/MarketBar/chartOptions-M.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";
export function Placeholder() {
  if (!IS_BROWSER) return <></>;
  const chartOptions_M = ChartOptions_M();

  const dummyData = {
    labels: [
      "1",
      "2",
      "3",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
    ],
    datasets: [
      {
        data: [
          0.01, 0.02, 0.015, 0.02, 0.015, 0.01, 0.05, 0.02, 0.05, 0.01, 0.15,
          0.02, 0.03, 0.02, 0.04, 0.05
        ],
        borderColor: "#999999",
        pointRadius: 0,
        borderWidth: 3,
        tension: 0.1,
      },
    ],
  };
  const chartData = dummyData;
  return (
    <>
      <div class="unselectable p-4 sm:mx-auto mx-4 mt-7 sm:mt-0 sm:h-[160px] sm:w-[430px] h-[100px] w-[calc(100vw-1.5rem)]">
        <Chart type="line" options={chartOptions_M} data={chartData} />
      </div>
    </>
  );
}
