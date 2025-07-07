import React, { useEffect, useMemo } from "react";
import { AgCharts } from "ag-charts-react";
import "ag-charts-enterprise";

const HeatmapChart = ({
  data,
  xField = "Type",
  yField = "Option",
  valueField = "Score",
  title,
  tab,
  activeFilter,
}) => {
  useEffect(() => {
    console.log("[HEATMAP DEBUG] Received tab:", tab);
    console.log("[HEATMAP DEBUG] Received data:", data);
    console.log("[HEATMAP DEBUG] Received activeFilter:", activeFilter);
  }, [tab, data]);

  const options = useMemo(() => {
    const flattenedData =
      tab === "Overall"
        ? data?.map((row) => ({
            Option: row.Option,
            Type: "Overall",
            Score: row.Overall,
          })) || []
        : data?.flatMap((row) =>
            Object.entries(row)
              .filter(
                ([key]) =>
                  key !== "Option" && key !== "Question" && key !== "Overall"
              )
              .map(([key, value]) => ({
                Option: row.Option,
                Type: key,
                Score: value,
              }))
          ) || [];

    return {
      data: flattenedData,
      title: { text: `${tab} - ${activeFilter}` },
      theme: {
        // baseTheme: "ag-default",
        overrides: {
          heatmap: {
            title: {
              fontFamily: "'Geisk', sans-serif",
              fontWeight: 600,
              fontSize: 16,
            },
          },
        },
      },
      series: [
        {
          type: "heatmap",
          xKey: xField,
          xName: "Segment",
          yKey: yField,
          yName: "Statement",
          colorKey: valueField,
          colorName: "Score",
          colorRange: ["#f4835c", "#e6678d", "#d76db2", "#b565c7", "#556ce4"],
          tooltip: { enabled: true },
        },
      ],
    };
  }, [data, title, xField, yField, valueField, tab]);

  return (
    <AgCharts style={{ width: "100%", height: "600px" }} options={options} />
  );
};

export default HeatmapChart;
