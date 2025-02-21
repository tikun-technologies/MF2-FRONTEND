import React, { useState } from "react";
import { useFilter } from "../../context/FilterContext";
import StudyTable from "../Table/StudyTable";
import ReactApexChart from "react-apexcharts";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Button } from "@mui/material";
// import HeatMapGrid from "react-heatmap-grid";
import { HeatmapChart } from "../Heatmap/HeatmapChart";
import styles from "./TabsContent.module.css";

const colors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#d84315",
  "#3949ab",
  "#f50057",
];

const TabsContent = ({ tab, topDown, bottomDown, responseTime }) => {
  const { activeFilter, activeVisualization } = useFilter();
  const [chartType, setChartType] = useState("bar");

  let filterDownedData = topDown;
  if (activeFilter === "Bottom-Up") {
    filterDownedData = bottomDown;
  } else if (activeFilter === "Response Time") {
    filterDownedData = responseTime;
  }

  if (!filterDownedData || !filterDownedData.Data?.Questions?.length) {
    return <p>No data available for this section.</p>;
  }

  return (
    <div className={styles.dataWrapper}>
      {activeVisualization === "graph" && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
          <button
            className={chartType === "bar" ? "activeButton" : ""}
            onClick={() => setChartType("bar")}
          >
            Bar Chart
          </button>
          <button
            className={chartType === "line" ? "activeButton" : ""}
            onClick={() => setChartType("line")}
          >
            Line Chart
          </button>
          <button
            className={chartType === "pie" ? "activeButton" : ""}
            onClick={() => setChartType("pie")}
          >
            Pie Chart
          </button>
        </div>
      )}
      {filterDownedData.Data.Questions.map((question, index) => {
        if (!question.options.length) return null;

        let headers = ["Response"];
        const data = question.options.map((option) => {
          console.log(option);
          let rowData = { Response: option.optiontext };

          if (tab === "overall") {
            headers = ["Response", "Total"];
            rowData.Total = option.Total ?? "-";
          } else if (tab === "Age Segments" || tab === "Gender Segments") {
            const keys = Object.keys(option[tab] || {});
            headers = ["Response", ...keys];
            keys.forEach((key) => {
              rowData[key] = option[tab][key] ?? "-";
            });
          } else if (tab === "Prelim-Answer Segments") {
            const mergedData = option[tab]?.reduce(
              (acc, obj) => ({ ...acc, ...obj }),
              {}
            );
            const keys = Object.keys(mergedData || {});
            headers = ["Response", ...keys];
            keys.forEach((key) => {
              rowData[key] = mergedData[key] ?? "-";
            });
          } else if (tab === "2Mindsets") {
            console.log(option.Mindsets);
            headers = ["Response", "Mindset 1 of 2", "Mindset 2 of 2"];

            // Extract values dynamically from the array
            const mindsets = Object.fromEntries(
              option.Mindsets.map((m) => Object.entries(m)[0])
            );

            rowData["Mindset 1 of 2"] = mindsets["Mindset 1 of 2"] ?? "-";
            rowData["Mindset 2 of 2"] = mindsets["Mindset 2 of 2"] ?? "-";
          } else if (tab === "3Mindsets") {
            headers = [
              "Response",
              "Mindset 1 of 3",
              "Mindset 2 of 3",
              "Mindset 3 of 3",
            ];

            // Extract values dynamically from the array
            const mindsets = Object.fromEntries(
              option.Mindsets.map((m) => Object.entries(m)[0])
            );

            rowData["Mindset 1 of 3"] = mindsets["Mindset 1 of 3"] ?? "-";
            rowData["Mindset 2 of 3"] = mindsets["Mindset 2 of 3"] ?? "-";
            rowData["Mindset 3 of 3"] = mindsets["Mindset 3 of 3"] ?? "-";
          }
          console.log(rowData);
          return rowData;
        });

        // className={styles.questionHeader}

        if (activeVisualization === "heatmap") {
          console.log(question);
          return (
            <div width="100%" key={index}>
              <h2 className={styles.questionHeader}>{question.Question}</h2>
              <HeatmapChart
                data={question.options}
                tab={tab}
                filter={activeFilter}
              />
            </div>
          );
        }

        return (
          <div className={styles.wrapper} key={index}>
            <h2 className={styles.questionHeader}>{question.Question}</h2>
            {activeVisualization === "table" ? (
              <StudyTable headers={headers} data={data} />
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                {chartType === "bar" && (
                  <BarChart data={data}>
                    <XAxis dataKey="Response" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {headers.slice(1).map((key, idx) => (
                      <Bar
                        key={key}
                        dataKey={key}
                        fill={colors[idx % colors.length]}
                      />
                    ))}
                  </BarChart>
                )}
                {chartType === "line" && (
                  <LineChart data={data}>
                    <XAxis dataKey="Response" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {headers.slice(1).map((key, idx) => (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={colors[idx % colors.length]}
                        strokeWidth={2}
                      />
                    ))}
                  </LineChart>
                )}
                {chartType === "pie" && (
                  <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie
                      data={data}
                      dataKey={headers[1]}
                      nameKey="Response"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {data.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[index % colors.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                )}
              </ResponsiveContainer>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TabsContent;
