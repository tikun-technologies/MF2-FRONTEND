import React, { useState } from "react";
import { useFilter } from "../../context/FilterContext";
import StudyTable from "../Table/StudyTable";
import { HeatmapChart } from "../Heatmap/HeatmapChart";
import CustomTooltip from "./CustomTooltip";
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
import styles from "./TabsContent.module.css";

// Define colors for charts
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

  // Determine which dataset to use based on the active filter
  let filterDownedData = topDown;
  if (activeFilter === "Bottom-Up") {
    filterDownedData = bottomDown;
  } else if (activeFilter === "Response Time") {
    filterDownedData = responseTime;
  }

  // If no data is available, display a message
  if (!filterDownedData || !filterDownedData.Data?.Questions?.length) {
    return <p>No data available for this section.</p>;
  }

  return (
    <div className={styles.dataWrapper}>

      {/* Map through questions and render visualizations */}
      {filterDownedData.Data.Questions.map((question, index) => {
        if (!question.options.length) return null;

        // Prepare headers and data for the table/chart
        let headers = ["Response"];
        const data = question.options.map((option) => {
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
            headers = ["Response", "Mindset 1 of 2", "Mindset 2 of 2"];
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
            const mindsets = Object.fromEntries(
              option.Mindsets.map((m) => Object.entries(m)[0])
            );
            rowData["Mindset 1 of 3"] = mindsets["Mindset 1 of 3"] ?? "-";
            rowData["Mindset 2 of 3"] = mindsets["Mindset 2 of 3"] ?? "-";
            rowData["Mindset 3 of 3"] = mindsets["Mindset 3 of 3"] ?? "-";
          }
          return rowData;
        });

        // Render heatmap if active visualization is heatmap
        if (activeVisualization === "heatmap") {
          return (
            <div className={styles.chartContainer} key={index}>
              <h2 className={styles.questionHeader}>{question.Question}</h2>
              <HeatmapChart
                data={question.options}
                tab={tab}
                filter={activeFilter}
                baseValues={filterDownedData["Base Values"]}

              />
            </div>
          );
        }

        // Render table or chart based on active visualization
        return (
          <div className={styles.chartContainer} key={index}>
            <h2 className={styles.questionHeader}>{question.Question}</h2>
            {activeVisualization === "table" ? (
              <StudyTable headers={headers} data={data} baseValues={filterDownedData["Base Values"]}/>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                {chartType === "bar" && (
                  <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <XAxis
                      dataKey="Response"
                      tick={{ fontSize: 12, width: '300' }}
                      interval={0}
                      height={30}
                      tickFormatter={(value) => {
                        const maxLength = 15;
                        if (value.length > maxLength) {
                          return value
                            .match(new RegExp(`.{1,${maxLength}}`, "g"))
                            .join("\n");
                        }
                        return value;
                      }}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} wrapperStyle={{ pointerEvents: "none", zIndex: 1000 }} />
                    {headers.slice(1).map((key, idx) => (
                      <Bar
                        key={key}
                        dataKey={key}
                        fill={colors[idx % colors.length]}
                      />
                    ))}
                  </BarChart>
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