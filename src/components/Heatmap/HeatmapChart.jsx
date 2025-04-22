import React from "react";
import Chart from "react-apexcharts";
import heatmapColors from "./heatmapColors";
import styles from "./Heatmap.module.css";

export const HeatmapChart = ({ data, tab, filter,baseValues }) => {
  console.log("data= ", data);
  console.log("Tab from study details:", tab);
  console.log("Filter from heatmap", filter);

  let ageCategories = [];

  const series = data.map((item) => {
    if (tab === "2Mindsets") {
      const mindsets = Object.fromEntries(
        item.Mindsets.map((m) => Object.entries(m)[0])
      );
      ageCategories = ["Mindset 1 of 2", "Mindset 2 of 2"];
      ageCategories = ageCategories.map(
        (category) => `${category}\n(${baseValues[category] ?? "-"})`
      );
      return {
        name: item.optiontext,
        data: [
          { x: "Mindset 1 of 2", y: mindsets["Mindset 1 of 2"] ?? "-" },
          { x: "Mindset 2 of 2", y: mindsets["Mindset 2 of 2"] ?? "-" },
        ],
      };
    } else if (tab === "3Mindsets") {
      const mindsets = Object.fromEntries(
        item.Mindsets.map((m) => Object.entries(m)[0])
      );
      ageCategories = ["Mindset 1 of 3", "Mindset 2 of 3", "Mindset 3 of 3"];
      ageCategories = ageCategories.map(
        (category) => `${category}\n(${baseValues[category] ?? "-"})`
      );
      return {
        name: item.optiontext,
        data: [
          { x: "Mindset 1 of 3", y: mindsets["Mindset 1 of 3"] ?? "-" },
          { x: "Mindset 2 of 3", y: mindsets["Mindset 2 of 3"] ?? "-" },
          { x: "Mindset 3 of 3", y: mindsets["Mindset 3 of 3"] ?? "-" },
        ],
      };
    } else if (tab === "Prelim-Answer Segments") {
      const formattedObject = Object.assign(
        {},
        ...item["Prelim-Answer Segments"]
      );
      console.log("Formatted segments: ", formattedObject);
      ageCategories = Object.keys(data[0][tab]);
      // ageCategories = ageCategories.map(
      //   (category) => `${category}\n(${baseValues[category] ?? "-"})`
      // );
      console.log("category:- ",ageCategories);
      console.log("name :- ",item.optiontext)
      return {
        name: item.optiontext,
        data: Object.entries(formattedObject).map(([age, value]) => ({
          x: `${age}\n(${baseValues[age] ?? "-"})`,
          // x: `${age}`,
          y: value,
        })),
      };
    } else if (tab === "overall") {
      ageCategories = ageCategories.map(
        (category) => `${category}\n(${baseValues[category] ?? "-"})`
      );
      return {
        name: item.optiontext,
        data: [{ x: "Total", y: item.Total ?? "-" }],
      };
    } else {
      ageCategories = Object.keys(data[0][tab]);
      ageCategories = ageCategories.map(
        
        (category) => `${category}\n(${baseValues[category] ?? "-"})`
      );
      // console.log("category:- ",categories);
      // console.log("item.optiontext:- ",item.optiontext);

      return {
        name: item.optiontext,
        data: Object.entries(item[tab]).map(([age, value]) => ({
          x: age,
          y: value,
        })),
      };
    }
  });

  const options = {
    chart: {
      type: "heatmap",
      toolbar: { show: true },
    },
    // ✅ Custom HTML tooltip
    tooltip: {
      enabled: true,
      followCursor: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        // If there's no data, return nothing
        if (
          !series[seriesIndex] ||
          typeof series[seriesIndex][dataPointIndex] === "undefined"
        ) {
          return "";
        }

        const val = series[seriesIndex][dataPointIndex];
        // row label (the "Y-axis" label for each row)
        const rowLabel = w.globals.seriesNames[seriesIndex];
        // column label (the "X-axis" label)
        const colLabel = w.globals.labels[dataPointIndex];

        // Return an HTML <div> so we can use normal wrapping
        return `
          <div style="
            max-width: 200px;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 8px;
            color: #000;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            white-space: normal;
            word-wrap: break-word;
            overflow-wrap: break-word;
          ">
            <strong>${rowLabel}</strong><br />
            <em>${colLabel}</em>: ${val}
          </div>
        `;
      },
    },
    dataLabels: { enabled: true },
    colors: heatmapColors[filter]?.ranges.map((range) => range.color) || [
      "#767676",
    ],
    xaxis: {
      categories: ageCategories,
    },
    yaxis: { show: false },
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
    <div className={styles.wrapper}>
      {/* Labels Container */}
      <div className={styles.labelsContainer}>
        {series
          .slice()
          .reverse()
          .map((item, index) => (
            <div key={index} className={styles.labelItem}>
              {item.name}
            </div>
          ))}
      </div>

      {/* Heatmap Chart */}
      <div className={styles.chartContainer}>
        <Chart options={options} series={series} type="heatmap" height={500} />
      </div>
    </div>
  );
};

export default HeatmapChart;