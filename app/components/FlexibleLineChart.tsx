import React, { useState, useCallback, useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import { Button } from "./ui/button";
import { CardTitle } from "./ui/card";

const FlexibleLineChart = ({
  data = [],
  title = "Dynamic Line Chart",
  lineColors = ["#1E90FF", "#32CD32"],
}: {
  data: Array<Object>;
  title: string;
  lineColors: Array<string>;
}) => {
  // Get the keys of the first data object
  const keys = Object.keys(data[0]);

  // First key will be used as x-axis label
  const xAxisKey = keys[0];

  // Find the next two numeric keys
  const numericKeys = keys
    .slice(1)
    .filter((key) => data.every((item: any) => typeof item[key] === "number"))
    .slice(0, 2);

  // If we don't have two numeric keys, return an error
  if (numericKeys.length < 2) {
    return <div>Need at least two numeric columns to plot</div>;
  }

  const [chartState, setChartState] = useState({
    left: null,
    right: null,
    refAreaLeft: null,
    refAreaRight: null,
  });

  // Memoized filtered data based on zoom
  const filteredData = useMemo(() => {
    if (chartState.left === null || chartState.right === null) {
      return data;
    }

    // Find index of left and right boundaries
    const leftIndex = data.findIndex(
      (item: any) => item[xAxisKey] === chartState.left
    );
    const rightIndex = data.findIndex(
      (item: any) => item[xAxisKey] === chartState.right
    );

    return data.slice(
      Math.min(leftIndex, rightIndex),
      Math.max(leftIndex, rightIndex) + 1
    );
  }, [data, chartState.left, chartState.right, xAxisKey]);

  // Handle mouse down to start selection
  const handleMouseDown = useCallback((e: any) => {
    setChartState((prev) => ({
      ...prev,
      refAreaLeft: e.activeLabel,
      refAreaRight: null,
    }));
  }, []);

  // Handle mouse move to update selection
  const handleMouseMove = useCallback(
    (e: any) => {
      if (chartState.refAreaLeft) {
        setChartState((prev) => ({
          ...prev,
          refAreaRight: e.activeLabel,
        }));
      }
    },
    [chartState.refAreaLeft]
  );

  // Handle zoom completion
  const handleMouseUp = useCallback(() => {
    if (chartState.refAreaLeft && chartState.refAreaRight) {
      const [left, right] = [
        chartState.refAreaLeft,
        chartState.refAreaRight,
      ].sort();

      setChartState({
        left,
        right,
        refAreaLeft: null,
        refAreaRight: null,
      });
    }
  }, [chartState.refAreaLeft, chartState.refAreaRight]);

  // Handle zoom out
  const zoomOut = useCallback(() => {
    setChartState({
      left: null,
      right: null,
      refAreaLeft: null,
      refAreaRight: null,
    });
  }, []);

  return (
    <div
      className="highlight-bar-charts p-5"
      style={{ userSelect: "none", width: "100%" }}
    >
      <div className="flex justify-between py-3">
        <CardTitle>{title}</CardTitle>
        <Button type="button" className="btn update" onClick={zoomOut}>
          Zoom Out
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={filteredData}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xAxisKey}
            type={typeof data[0][xAxisKey] === "number" ? "number" : "category"}
          />

          {numericKeys.map((key, index) => (
            <React.Fragment key={key}>
              <YAxis
                label={{
                  value: key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase()),
                  angle: -90,
                  position: "insideLeft",
                }}
                orientation={index % 2 === 0 ? "left" : "right"}
                yAxisId={`axis-${index + 1}`}
                type="number"
              />
              <Line
                yAxisId={`axis-${index + 1}`}
                type="monotone"
                dataKey={key}
                stroke={lineColors[index % lineColors.length]}
                animationDuration={300}
                dot={false}
              />
            </React.Fragment>
          ))}

          <Tooltip />

          {chartState.refAreaLeft && chartState.refAreaRight ? (
            <ReferenceArea
              x1={chartState.refAreaLeft}
              x2={chartState.refAreaRight}
              strokeOpacity={0.3}
              fill="blue"
              fillOpacity={0.1}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FlexibleLineChart;
