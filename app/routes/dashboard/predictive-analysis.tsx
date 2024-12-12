import { ForecastSummary } from "@/components/forecast-summary";
import { WaterUsagePrediction } from "@/components/water-usage-prediction";
import { AIRecommendations } from "@/components/ai-recommendation";

export default function PredictiveAnalysisPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Predictive Analysis</h1>
      <ForecastSummary />
      <div className="grid lg:grid-cols-2 gap-6">
        <WaterUsagePrediction />
      </div>
      <AIRecommendations />
    </div>
  );
}
