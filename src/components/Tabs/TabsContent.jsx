import React from "react";
import { useFilter } from "../../context/FilterContext";
import styles from "./TabsContent.module.css";
import MasterGridDetail from "../Table/MasterGridDetail"; // 🔁 Fix name if needed

const TabsContent = ({ tab, topDown, bottomDown, responseTime }) => {
  const { activeFilter, activeVisualization } = useFilter();

  // Select correct dataset — still useful if API returns different structures later
  let filterDownedData = topDown;
  if (activeFilter === "Bottom-Up") {
    filterDownedData = bottomDown;
  } else if (activeFilter === "Response Time") {
    filterDownedData = responseTime;
  }

  return (
    <div className={styles.dataWrapper}>
      {activeVisualization === "table" && (
        <MasterGridDetail
          label={`AG ${activeVisualization === "heatmap" ? "Heatmap" : "Table"} — ${activeFilter} — ${tab}`}
        />
      )}
    </div>
  );
};

export default TabsContent;
