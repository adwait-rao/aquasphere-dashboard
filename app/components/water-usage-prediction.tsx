"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", predicted: 4000, historical: 3000 },
  { month: "Feb", predicted: 3500, historical: 3200 },
  { month: "Mar", predicted: 3200, historical: 3400 },
  { month: "Apr", predicted: 3800, historical: 3600 },
  { month: "May", predicted: 4200, historical: 3800 },
  { month: "Jun", predicted: 4500, historical: 4000 },
];

export function WaterUsagePrediction() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Predicted vs Historical Water Usage</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#8884d8"
              name="Predicted"
            />
            <Line
              type="monotone"
              dataKey="historical"
              stroke="#82ca9d"
              name="Historical"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
