import React from "react";
import Chart from "react-apexcharts";
import heatmapColors from "./heatmapColors";
import styles from "./Heatmap.module.css";

export const HeatmapChart = ({ data, tab, filter }) => {
  console.log("data= ", data);
  console.log("Tab from study details:", tab);
  console.log("Filter from heatmap", filter);

  // Build the series for ApexCharts
  let ageCategories = [];
  const series = data.map((item) => {
    if (tab === "2Mindsets") {
      // Example: 2 Mindsets
      const mindsets = Object.fromEntries(
        item.Mindsets.map((m) => Object.entries(m)[0])
      );
      ageCategories = ["Mindset 1 of 2", "Mindset 2 of 2"];
      return {
        name: item.optiontext, // This label goes in our custom column
        data: [
          { x: "Mindset 1 of 2", y: mindsets["Mindset 1 of 2"] ?? "-" },
          { x: "Mindset 2 of 2", y: mindsets["Mindset 2 of 2"] ?? "-" },
        ],
      };
    } else if (tab === "3Mindsets") {
      // Example: 3 Mindsets
      const mindsets = Object.fromEntries(
        item.Mindsets.map((m) => Object.entries(m)[0])
      );
      ageCategories = ["Mindset 1 of 3", "Mindset 2 of 3", "Mindset 3 of 3"];
      return {
        name: item.optiontext,
        data: [
          { x: "Mindset 1 of 3", y: mindsets["Mindset 1 of 3"] ?? "-" },
          { x: "Mindset 2 of 3", y: mindsets["Mindset 2 of 3"] ?? "-" },
          { x: "Mindset 3 of 3", y: mindsets["Mindset 3 of 3"] ?? "-" },
        ],
      };
    } else if (tab === "Prelim-Answer Segments") {
      // Example: Prelim-Answer Segments
      const formattedObject = Object.assign(
        {},
        ...item["Prelim-Answer Segments"]
      );
      ageCategories = Object.keys(data[0][tab]);
      return {
        name: item.optiontext,
        data: Object.entries(formattedObject).map(([age, value]) => ({
          x: age,
          y: value,
        })),
      };
    } else if (tab === "overall") {
      // Single column labeled "Total"
      return {
        name: item.optiontext,
        data: [{ x: "Total", y: item.Total ?? "-" }],
      };
    } else {
      // Generic case (Age, Gender, etc.)
      ageCategories = Object.keys(data[0][tab]);
      return {
        name: item.optiontext,
        data: Object.entries(item[tab]).map(([age, value]) => ({
          x: age,
          y: value,
        })),
      };
    }
  });

  // ApexCharts config
  const options = {
    chart: {
      type: "heatmap",
      toolbar: { show: true },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
        colors: ["#000"],
      },
    },
    colors: heatmapColors[filter]?.ranges.map((range) => range.color) || [
      "#767676",
    ],
    title: { text: "" },
    xaxis: {
      categories: ageCategories,
    },
    // Hide ApexCharts' y-axis labels so we can use our own
    yaxis: {
      labels: {
        show: false,
      },
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: heatmapColors[filter]?.ranges || [
            { from: -1000, to: 0, color: "#ba322b", name: "Negative" },
            { from: 0, to: 20, color: "#767676", name: "Neutral" },
            { from: 20, to: 1000, color: "#029109", name: "Positive" },
          ],
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      {/* LEFT COLUMN: Custom multiline labels */}
      <div className={styles.labelColumn}>
        {series.map((row, idx) => (
          <div key={idx} className={styles.labelRow}>
            {row.name}
          </div>
        ))}
      </div>

      {/* RIGHT COLUMN: Heatmap Chart */}
      <div className={styles.chartColumn}>
        <Chart options={options} series={series} type="heatmap" height={400} />
      </div>
    </div>
  );
};

export default HeatmapChart;
