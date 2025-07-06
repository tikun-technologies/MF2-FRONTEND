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
    <div className={`${styles.studyFiltersContainer} card`}>
      {/* Visualization Toggle */}
      <div className={styles.studyVisualizations}>
        <button
          className={`btn ${activeVisualization === "table" ? "active" : ""}`}
          onClick={() => setActiveVisualization("table")}
        >
          <FiTable />
        </button>
        <button
          className={`btn ${activeVisualization === "heatmap" ? "active" : ""}`}
          onClick={() => setActiveVisualization("heatmap")}
        >
          <FiRadio />
        </button>
        <button
          className={`btn ${activeVisualization === "graph" ? "active" : ""}`}
          onClick={() => setActiveVisualization("graph")}
        >
          <FiGrid />
        </button>
      </div>

      {/* Divider */}
      <div className={`divider-small ${styles.hideOnMobile}`} />

      {/* Filter Buttons */}
      <div className={styles.studyFilters}>
        <button
          className={`btn btn-small ${activeFilter === "Top-Down" ? "active" : ""}`}
          onClick={() => setActiveFilter("Top-Down")}
        >
          Top Down
        </button>
        <button
          className={`btn btn-small ${activeFilter === "Bottom-Up" ? "active" : ""}`}
          onClick={() => setActiveFilter("Bottom-Up")}
        >
          Bottom Up
        </button>
        <button
          className={`btn btn-small ${activeFilter === "Response Time" ? "active" : ""}`}
          onClick={() => setActiveFilter("Response Time")}
        >
          Response Time
        </button>
      </div>
    </div>
  );
};

export default StudyFilters;
