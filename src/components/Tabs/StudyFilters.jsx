import React from "react";
import { useFilter } from "../../context/FilterContext";
import { FiGrid, FiRadio, FiTable } from "react-icons/fi";
import styles from "./StudyFilters.module.css";

const StudyFilters = () => {
  const {
    activeFilter,
    setActiveFilter,
    activeVisualization,
    setActiveVisualization,
  } = useFilter();

  return (
    <div className={styles.studyFiltersContainer}>
      {/* Visualization Toggle */}
      <div className={styles.studyVisualizations}>
        <button
          className={`${styles.buttonIcon} ${
            activeVisualization === "table" ? styles.activeButton : ""
          }`}
          onClick={() => setActiveVisualization("table")}
        >
          <FiTable />
        </button>
        <button
          className={`${styles.buttonIcon} ${
            activeVisualization === "heatmap" ? styles.activeButton : ""
          }`}
          onClick={() => setActiveVisualization("heatmap")}
        >
          <FiRadio />
        </button>
        <button
          className={`${styles.buttonIcon} ${
            activeVisualization === "graph" ? styles.activeButton : ""
          }`}
          onClick={() => setActiveVisualization("graph")}
        >
          <FiGrid />
        </button>
      </div>

      {/* Filter Buttons */}
      <div className={styles.studyFilters}>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "Top-Down" ? styles.activeToggle : ""
          }`}
          onClick={() => setActiveFilter("Top-Down")}
        >
          Top Down
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "Bottom-Up" ? styles.activeToggle : ""
          }`}
          onClick={() => setActiveFilter("Bottom-Up")}
        >
          Bottom Up
        </button>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "Response Time" ? styles.activeToggle : ""
          }`}
          onClick={() => setActiveFilter("Response Time")}
        >
          Response Time
        </button>
      </div>
    </div>
  );
};

export default StudyFilters;
