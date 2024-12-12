import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Droplet, TrendingUp, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface TodayRecord {
  date: string;
  evapotranspiration: number;
  evaporation_loss: number;
  water_level_prophet: number;
}

interface CurrWaterRequi {
  ds: string;
  yhat: number;
}

interface ApiResponse {
  curr_water_requi: CurrWaterRequi[];
  today_records: TodayRecord[];
}

export function SummaryPanel() {
  const [summaryData, setSummaryData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchData() {
    try {
      const response = await axios.post<ApiResponse>(
        "https://aquasphere.onrender.com/api/dashboard"
      );
      setSummaryData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Water Level of Reservoir
          </CardTitle>
          <Droplet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {summaryData?.today_records?.[0]?.water_level_prophet ?? "N/A"} m
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Evapotranspiration
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {summaryData?.today_records?.[0]?.evapotranspiration ?? "N/A"} mm
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Evaporation Loss
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {summaryData?.today_records?.[0]?.evaporation_loss ?? "N/A"} mm
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
