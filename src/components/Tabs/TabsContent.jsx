import React from "react";
import { useFilter } from "../../context/FilterContext";
import styles from "./TabsContent.module.css";
import MasterGridDetail from "../Table/MasterGridDetail";
import HeatmapChart from "../Graphs/Heatmap/HeatmapChart";

const TabsContent = ({ tab, topDown, bottomDown, responseTime }) => {
  const { activeFilter, activeVisualization } = useFilter();

  let filterDownedData = topDown;
  if (activeFilter === "Bottom-Up") {
    filterDownedData = bottomDown;
  } else if (activeFilter === "Response Time") {
    filterDownedData = responseTime;
  }

  const [globalMinValue, setGlobalMinValue] = React.useState(null);

  const filteredData = React.useMemo(() => {
    const rows = Array.isArray(filterDownedData) ? filterDownedData : [];
    const safeMin =
      typeof globalMinValue === "number" ? globalMinValue : -Infinity;

    return rows
      .map((row) => {
        const newRow = {};
        let hasValueAboveMin = false;

        for (const [key, value] of Object.entries(row)) {
          if (typeof value === "number") {
            if (value > safeMin) {
              newRow[key] = value;
              hasValueAboveMin = true;
            } else {
              newRow[key] = ""; // Hide number
            }
          } else {
            newRow[key] = value;
          }
        }

        return hasValueAboveMin ? newRow : null; // Exclude if nothing matched
      })
      .filter(Boolean); // Remove null rows
  }, [filterDownedData, globalMinValue]);

  console.log("🚨 Filtered sample:", filteredData?.[0]);

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Global Filters
          <input
            type="number"
            value={globalMinValue ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              setGlobalMinValue(val === "" ? null : Number(val));
            }}
            style={{ width: "60px", marginLeft: "6px" }}
          />
        </label>
      </div>

      <div className={styles.dataWrapper}>
        {activeVisualization === "table" && (
          <MasterGridDetail
            tab={tab}
            data={filteredData}
            activeFilter={activeFilter}
          />
        )}

        {activeVisualization === "heatmap" && (
          <HeatmapChart
            tab={tab}
            data={filteredData}
            activeFilter={activeFilter}
          />
        )}
      </div>
    </>
  );
};

export default TabsContent;
