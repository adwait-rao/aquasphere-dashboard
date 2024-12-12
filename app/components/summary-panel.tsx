import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Droplet, TrendingUp, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export function SummaryPanel() {
  const [summaryData, setSummaryData] = useState<any>({
    evapotranspiration: 0,
    evaporation_loss: 0,
    water_level_prophet: 0,
  });
  async function fetchData() {
    const response = await axios.post(
      "https://aquasphere.onrender.com/api/dashboard"
    );
    setSummaryData(response.data[0]);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Water Level of reservoir
          </CardTitle>
          <Droplet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {summaryData?.water_level_prophet} m
          </div>
          {/* <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p> */}
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
            {summaryData?.evapotranspiration} mm
          </div>
          {/* <p className="text-xs text-muted-foreground">+5% from last year</p> */}
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
            {summaryData?.evaporation_loss} mm
          </div>
          {/* <p className="text-xs text-muted-foreground">Next 30 days</p> */}
        </CardContent>
      </Card>
    </div>
  );
}
