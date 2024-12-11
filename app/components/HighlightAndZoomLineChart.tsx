import React, { useState, useCallback } from "react";
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

const getAxisYDomain = (data, from, to, ref, offset) => {
  const refData = data.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];

  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const HighlightAndZoomLineChart = ({
  data = [],
  title = "Predicted vs Historical Data",
  lineColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"],
}) => {
  const [chartState, setChartState] = useState({
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    domains: {},
  });

  // Dynamically generate Y-axis configurations based on data keys
  const dataKeys =
    data.length > 0
      ? Object.keys(data[0]).filter(
          (key) => typeof data[0][key] === "number" && key !== "name"
        )
      : [];

  const zoom = useCallback(() => {
    const { refAreaLeft, refAreaRight } = chartState;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setChartState((prev) => ({
        ...prev,
        refAreaLeft: "",
        refAreaRight: "",
      }));
      return;
    }

    // Ensure correct order of reference areas
    const [left, right] =
      refAreaLeft > refAreaRight
        ? [refAreaRight, refAreaLeft]
        : [refAreaLeft, refAreaRight];

    // Calculate domains for each numeric key
    const newDomains = dataKeys.reduce((acc, ref) => {
      const [bottom, top] = getAxisYDomain(data, left, right, ref, 50);
      acc[ref] = { bottom, top };
      return acc;
    }, {});

    setChartState({
      left,
      right,
      refAreaLeft: "",
      refAreaRight: "",
      domains: newDomains,
    });
  }, [chartState, data, dataKeys]);

  const zoomOut = useCallback(() => {
    setChartState({
      left: "dataMin",
      right: "dataMax",
      refAreaLeft: "",
      refAreaRight: "",
      domains: {},
    });
  }, []);

  // Bail out if no data
  if (data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div
      className="highlight-bar-charts p-5"
      style={{ userSelect: "none", width: "100%" }}
    >
      <div className="flex items-center justify-between py-3">
        <CardTitle>{title}</CardTitle>
        <Button type="button" className="btn update" onClick={zoomOut}>
          Zoom Out
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          onMouseDown={(e) =>
            setChartState((prev) => ({ ...prev, refAreaLeft: e.activeLabel }))
          }
          onMouseMove={(e) =>
            chartState.refAreaLeft &&
            setChartState((prev) => ({ ...prev, refAreaRight: e.activeLabel }))
          }
          onMouseUp={zoom}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="name"
            domain={[chartState.left, chartState.right]}
            type="number"
          />

          {/* Dynamically render Y-axes and Lines */}
          {dataKeys.map((key, index) => (
            <React.Fragment key={key}>
              <YAxis
                orientation={index % 2 === 0 ? "left" : "right"}
                yAxisId={`axis-${index + 1}`}
                allowDataOverflow
                domain={[
                  chartState.domains[key]?.bottom || "dataMin",
                  chartState.domains[key]?.top || "dataMax",
                ]}
                type="number"
              />
              <Line
                yAxisId={`axis-${index + 1}`}
                type="natural"
                dataKey={key}
                stroke={lineColors[index % lineColors.length]}
                animationDuration={300}
              />
            </React.Fragment>
          ))}

          <Tooltip />

          {chartState.refAreaLeft && chartState.refAreaRight ? (
            <ReferenceArea
              x1={chartState.refAreaLeft}
              x2={chartState.refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HighlightAndZoomLineChart;
