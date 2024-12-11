import React from "react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from "recharts";

const CustomBarChart = ({
  data,
  leftBarKey,
  rightBarKey,
  leftBarColor,
  rightBarColor,
}) => {
  // Dynamically determine the first key in the data object to use as X-axis key
  const xKey = Object.keys(data[0])[0];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 70, // Extra space for labels and brush
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 12 }} // Customize tick font size
          label={{
            value: xKey, // Descriptive label for X-axis
            position: "insideBottom",
            offset: -20,
          }}
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke={leftBarColor || "#8884d8"}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke={rightBarColor || "#82ca9d"}
        />
        <Tooltip />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey={leftBarKey}
          fill={leftBarColor || "#8884d8"}
        />
        <Bar
          yAxisId="right"
          dataKey={rightBarKey}
          fill={rightBarColor || "#82ca9d"}
        />
        <Brush dataKey={xKey} height={30} stroke="#8884d8" y={340} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
