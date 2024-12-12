import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, Cloud, TrendingUp } from "lucide-react";

export function ForecastSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Predicted Water Demand
          </CardTitle>
          <Droplet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,345,678 m³</div>
          <p className="text-xs text-muted-foreground">Next quarter</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Expected Rainfall
          </CardTitle>
          <Cloud className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">450 mm</div>
          <p className="text-xs text-muted-foreground">Next quarter</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Potential Water Savings
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">15%</div>
          <p className="text-xs text-muted-foreground">
            Compared to last quarter
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
