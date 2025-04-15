import React, { useState } from "react";
import { useFilter } from "../../context/FilterContext";

// import PlaygroundSegmentFilter from "../Playground/Playground";

import StudyPlayground from "../Playground/Playground"
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





const PlaygroundTabsContent = ({ study }) => {
  const { activeFilter, activeVisualization } = useFilter();
  const [chartType, setChartType] = useState("bar");

  // Determine which dataset to use based on the active filter
  let filterDownedData = study.studyData["(T) Combined"];
  if (activeFilter === "Bottom-Up") {
    filterDownedData = study.studyData["(B) Combined"];
  } else if (activeFilter === "Response Time") {
    filterDownedData = study.studyData["(R) Combined"];
  }

  // If no data is available, display a message
  if (!filterDownedData || !filterDownedData.Data?.Questions?.length) {
    return <p>No data available for this section.</p>;
  }

  return <StudyPlayground study={filterDownedData} visualType={activeVisualization}/>
};

export default PlaygroundTabsContent;