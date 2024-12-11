import { SummaryPanel } from "@/components/summary-panel";
import PageTitle from "@/components/ui/PageTitle";
import HighlightAndZoomLineChart from "@/components/HighlightAndZoomLineChart";
import FlexibleLineChart from "@/components/FlexibleLineChart";
import BiAxialBarGraph from "@/components/BiAxialBarGraph";
import CustomBarChart from "@/components/BiAxialBarGraph";
import { ModeToggle } from "@/components/mode-toggle";
import { useContext } from "react";
import { DamContext } from "@/components/Providers/DamProvider";
import { waterData } from "@/data";

export default function Index() {
  const damContext = useContext(DamContext);
  // const { currentDam } = damContext;

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <PageTitle className="mb-0">Dashboard</PageTitle>
        <ModeToggle />
      </div>
      <SummaryPanel />
      {/* <HighlightAndZoomLineChart
        data={initialData}
        title="Multi-Metric Analysis"
        lineColors={["#ff0000", "#00ff00", "#0000ff"]}
      /> */}
      <FlexibleLineChart
        data={waterData}
        title="Water utilized vs Total water"
        // lineColors={}
      />

      <div style={{ width: "100%", height: "400px" }}>
        <CustomBarChart
          data={waterData}
          xKey="Date"
          leftBarKey="utilizedWater"
          rightBarKey="totalWater"
          leftBarColor="#8884d8"
          rightBarColor="#82ca9d"
        />
      </div>

      {/* <div className="w-64 h-64">
        <Map />
      </div> */}
    </div>
  );
}
