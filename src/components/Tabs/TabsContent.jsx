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


const CustomLegend = ({ payload }) => (
  <div style={{
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    position: "absolute",
    top: "5px",   // Keep it close to the top
    right: "10px",
    background: "rgba(255, 255, 255, 0.8)",
    padding: "5px 10px",
    borderRadius: "8px",
    zIndex: 10
  }}>
    {payload.map((entry, index) => (
      <div key={`item-${index}`} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <span
          style={{
            display: "inline-block",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: entry.color,
          }}
        />
        <span style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
          {entry.value}
        </span>
      </div>
    ))}
  </div>
);

const parseInputToFloat = (valueStr, defaultValue) => {
  if (valueStr === null || valueStr === undefined || String(valueStr).trim() === "") {
    return defaultValue;
  }
  const num = parseFloat(valueStr);
  return isNaN(num) ? defaultValue : num;
};

const TabsContent = ({ tab, topDown, bottomDown, responseTime }) => {
  const { activeFilter, activeVisualization } = useFilter();
  const [chartType, setChartType] = useState("bar");
  const [filterType, setFilterType] = useState("gte"); // Initialize to "gte"
  const [filterValueStart, setFilterValueStart] = useState(-1e9);
  const [filterValueEnd, setFilterValueEnd] = useState(1e9);
  const [showAllQuestions, setShowAllQuestions] = useState(false); // New state for the checkbox
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

      <div className="flex justify-between items-center mb-4 bg-gray-100 !p-4 rounded">
        <div className="flex gap-4 items-center"> {/* Wrapper for select and inputs */}
          <select
            name="globalFilter"
            id="filter"
            value={filterType} // Control the select component
            onChange={(e) => {
              setFilterType(e.target.value);
              setFilterValueStart(-1e9); // Reset on type change
              setFilterValueEnd(1e9);   // Reset on type change
            }}
            className="border border-gray-300 rounded !p-2"
          >
            <option value="gte">Greater than or equal to</option>
            <option value="lte">Less than or equal to</option>
            <option value="between">Between</option>
          </select>
          {
            filterType === "between" && (
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  onChange={(e) => setFilterValueStart(parseInputToFloat(e.target.value, -1e9))}
                  className="border border-gray-300 rounded !p-2"
                />
                <input
                  type="number"
                  placeholder="Max"
                  onChange={(e) => setFilterValueEnd(parseInputToFloat(e.target.value, 1e9))}
                  className="border border-gray-300 rounded !p-2"
                />
              </div>
            )
          }
          {
            filterType !== "between" && (
              <input
                type="number"
                placeholder="Value"
                onChange={(e) => {
                  const valueStr = e.target.value;
                  if (filterType === 'lte') {
                    setFilterValueEnd(parseInputToFloat(valueStr, 1e9));
                  } else { // 'gte'
                    setFilterValueStart(parseInputToFloat(valueStr, -1e9));
                  }
                }}
                className="border border-gray-300 rounded !p-2"
              />
            )
          }
        </div>
        <div className="flex items-center gap-2"> {/* Wrapper for checkbox */}
          <input
            type="checkbox"
            id="showAllQuestions"
            checked={showAllQuestions}
            onChange={(e) => setShowAllQuestions(e.target.checked)}
            className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="showAllQuestions" className="text-sm font-medium text-gray-700">
            Show all questions (mark filtered as '-')
          </label>
        </div>
        {/* <button onClick={() => {

        }} className="bg-blue-500 text-white rounded !p-2">Apply Filter</button> */}
      </div>

      {/* Map through questions and render visualizations */}
      {filterDownedData.Data.Questions.map((question, index) => {
        if (!question.options || question.options.length === 0) return null;

        // 1. Determine headers for the current question consistently
        let questionSpecificHeaders = ["Response"];
        if (tab === "overall") {
          questionSpecificHeaders = ["Response", "Total"];
        } else if (tab === "Age Segments" || tab === "Gender Segments") {
          const allKeys = new Set();
          question.options.forEach(opt => {
            if (opt && opt[tab]) {
              Object.keys(opt[tab]).forEach(key => allKeys.add(key));
            }
          });
          questionSpecificHeaders = ["Response", ...Array.from(allKeys).sort()];
        } else if (tab === "Prelim-Answer Segments") {
          const allKeys = new Set();
          question.options.forEach(opt => {
            if (opt && opt[tab] && Array.isArray(opt[tab])) {
              const mergedData = opt[tab].reduce((acc, obj) => ({ ...acc, ...obj }), {});
              Object.keys(mergedData).forEach(key => allKeys.add(key));
            }
          });
          questionSpecificHeaders = ["Response", ...Array.from(allKeys).sort()];
        } else if (tab === "2Mindsets") {
          questionSpecificHeaders = ["Response", "Mindset 1 of 2", "Mindset 2 of 2"];
        } else if (tab === "3Mindsets") {
          questionSpecificHeaders = ["Response", "Mindset 1 of 3", "Mindset 2 of 3", "Mindset 3 of 3"];
        }

        // 2. Process and filter options
        const processedData = question.options.flatMap(option => {
          let rowData = { Response: option.optiontext };
          let skipOptionDueToFilter = false;
          const dataKeys = questionSpecificHeaders.slice(1);
          let currentOptionValues = {}; // To store raw values for the current option

          if (tab === "overall") {
            const val = option.Total;
            if (typeof val === 'number') {
              const isInFilterRange = val >= filterValueStart && val <= filterValueEnd;
              if (showAllQuestions) {
                rowData.Total = isInFilterRange ? val : "-";
              } else {
                if (!isInFilterRange) return []; // Skip row for "overall"
                rowData.Total = val;
              }
            } else {
              rowData.Total = val ?? "-";
            }
          } else {
            // First, gather all relevant values for the current option and check for skipping
            if (tab === "Age Segments" || tab === "Gender Segments") {
              const segmentData = option[tab] || {};
              dataKeys.forEach(key => currentOptionValues[key] = segmentData[key]);
            } else if (tab === "Prelim-Answer Segments") {
              const mergedOptionData = (option[tab] && Array.isArray(option[tab])) ?
                option[tab].reduce((acc, obj) => ({ ...acc, ...obj }), {}) : {};
              dataKeys.forEach(key => currentOptionValues[key] = mergedOptionData[key]);
            } else if (tab === "2Mindsets" || tab === "3Mindsets") {
              const mindsets = (option.Mindsets && Array.isArray(option.Mindsets)) ?
                Object.fromEntries(option.Mindsets.map(m => Object.entries(m)[0])) : {};
              dataKeys.forEach(key => currentOptionValues[key] = mindsets[key]);
            }

            if (!showAllQuestions) {
              for (const key of dataKeys) {
                const val = currentOptionValues[key];
                if (typeof val === 'number' && !(val >= filterValueStart && val <= filterValueEnd)) {
                  skipOptionDueToFilter = true;
                  break;
                }
              }
            }

            if (skipOptionDueToFilter) {
              return []; // Skip this entire option
            }

            // If not skipped, populate rowData, applying '-' if needed
            dataKeys.forEach(key => {
              const val = currentOptionValues[key];
              if (typeof val === 'number') {
                const isInFilterRange = val >= filterValueStart && val <= filterValueEnd;
                // If showAllQuestions is true, out-of-range becomes '-'.
                // If showAllQuestions is false, we already know all values were in range (due to skipOptionDueToFilter check).
                rowData[key] = (showAllQuestions && !isInFilterRange) ? "-" : val;
              } else {
                rowData[key] = val ?? "-";
              }
            });
          }
          return [rowData];
        });

        if (processedData.length === 0) {
          return (
            <div className={styles.chartContainer} key={index}>
              <h2 className={styles.questionHeader}>{question.Question}</h2>
              <p>No data matching the filter criteria for this question.</p>
            </div>
          );
        }

        let heatmapSourceOptions = question.options;
        if (!showAllQuestions) {
          heatmapSourceOptions = question.options.filter(option => {
            const dataKeys = questionSpecificHeaders.slice(1);
            let allValuesInRange = true;
            let valuesToCheck = {};

            if (tab === "overall") {
              const val = option.Total;
              return typeof val === 'number' && (val >= filterValueStart && val <= filterValueEnd);
            } else if (tab === "Age Segments" || tab === "Gender Segments") {
              const segmentData = option[tab] || {};
              dataKeys.forEach(key => valuesToCheck[key] = segmentData[key]);
            } else if (tab === "Prelim-Answer Segments") {
              const mergedOptionData = (option[tab] && Array.isArray(option[tab])) ?
                option[tab].reduce((acc, obj) => ({ ...acc, ...obj }), {}) : {};
              dataKeys.forEach(key => valuesToCheck[key] = mergedOptionData[key]);
            } else if (tab === "2Mindsets" || tab === "3Mindsets") {
              const mindsets = (option.Mindsets && Array.isArray(option.Mindsets)) ?
                Object.fromEntries(option.Mindsets.map(m => Object.entries(m)[0])) : {};
              dataKeys.forEach(key => valuesToCheck[key] = mindsets[key]);
            } else {
              return true; // If tab type doesn't match, don't filter out yet
            }

            // For non-overall tabs, check all relevant numerical values
            if (tab !== "overall" && dataKeys.length > 0) {
              for (const key of dataKeys) {
                const val = valuesToCheck[key];
                if (typeof val === 'number' && !(val >= filterValueStart && val <= filterValueEnd)) {
                  allValuesInRange = false;
                  break;
                }
              }
            } else if (tab !== "overall" && dataKeys.length === 0) { // No data keys to check
              allValuesInRange = true;
            }


            return allValuesInRange;
          });
        }

        if (activeVisualization === "heatmap") {
          if (heatmapSourceOptions.length === 0) {
            return (
              <div className={styles.chartContainer} key={index}>
                <h2 className={styles.questionHeader}>{question.Question}</h2>
                <p>No data available for heatmap after filtering.</p>
              </div>
            );
          }
          return (
            <div className={styles.chartContainer} key={index}>
              <h2 className={styles.questionHeader}>{question.Question}</h2>
              <HeatmapChart
                data={heatmapSourceOptions} // Use potentially modified heatmapSourceOptions
                tab={tab}
                filter={activeFilter}
                baseValues={filterDownedData["Base Values"]}
              />
            </div>
          );
        }

        const numericValues = processedData.flatMap(d =>
          questionSpecificHeaders.slice(1).map(key => parseFloat(d[key])).filter(n => !isNaN(n))
        );
        const maxValue = numericValues.length > 0 ? Math.max(0, ...numericValues) : 0;
        const roundedMax = Math.ceil((maxValue * 1.2) / 10) * 10;


        return (
          <div className={styles.chartContainer} key={index}>
            <h2 className={styles.questionHeader}>{question.Question}</h2>
            {activeVisualization === "table" ? (
              <StudyTable headers={questionSpecificHeaders} data={processedData} baseValues={filterDownedData["Base Values"]} />
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                {chartType === "bar" && (
                  <BarChart
                    data={[...processedData].reverse()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <XAxis
                      dataKey="Response"
                      tick={{ fontSize: 18, width: "200" }}
                      interval={0}
                      height={30}
                      tickFormatter={(value) => {
                        const maxLength = 15;
                        if (value.length > maxLength) {
                          return value.match(new RegExp(`.{1,${maxLength}}`, "g")).join("\n");
                        }
                        return value;
                      }}
                    />
                    <YAxis tick={{ fontSize: 18 }} domain={[0, roundedMax > 0 ? roundedMax : 'auto']} />
                    <Tooltip content={<CustomTooltip />} wrapperStyle={{ pointerEvents: "none", zIndex: 1000 }} />
                    <Legend
                      verticalAlign="top"
                      align="center"
                      wrapperStyle={{ fontSize: "16px" }}
                    />
                    {questionSpecificHeaders.slice(1).map((key, idx) => (
                      <Bar key={key} dataKey={key} fill={colors[idx % colors.length]} />
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