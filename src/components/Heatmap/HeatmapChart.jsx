import React from "react";
import Chart from "react-apexcharts";
import heatmapColors from "./heatmapColors";
import styles from "./Heatmap.module.css";

export const HeatmapChart = ({ data, tab, filter }) => {
  console.log("data= ", data);
  console.log("Tab from study details:", tab);
  console.log("Filter from heatmap", filter);

  // if (tab==="overall") {
  //   return <p>No data available</p>;
  // }

  let ageCategories = [];
  console.log(ageCategories);
  const series = data.map((item) => {
    if (tab === "2Mindsets") {
      const mindsets = Object.fromEntries(
        item.Mindsets.map((m) => Object.entries(m)[0])
      );
      ageCategories[("Mindset 1 of 2", "Mindset 2 of 2")];
      return {
        name: item.optiontext, // Y-axis (Row Labels)
        data: [
          { x: "Mindset 1 of 2", y: mindsets["Mindset 1 of 2"] ?? "-" },
          { x: "Mindset 2 of 2", y: mindsets["Mindset 2 of 2"] ?? "-" },
        ],
      };
    } else if (tab === "3Mindsets") {
      const mindsets = Object.fromEntries(
        item.Mindsets.map((m) => Object.entries(m)[0])
      );
      ageCategories[("Mindset 1 of 3", "Mindset 2 of 3", "Mindset 3 of 3")];
      return {
        name: item.optiontext, // Y-axis (Row Labels)
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
      console.log("formated plumn:- ", formattedObject);
      ageCategories = Object.keys(data[0][tab]);
      return {
        name: item.optiontext, // Y-axis (Row Labels)
        data: Object.entries(formattedObject).map(([age, value]) => ({
          x: age,
          y: value,
        })),
      };
    } else if (tab === "overall") {
      return {
        name: item.optiontext, // Y-axis (Row Labels)
        data: [{ x: "Total", y: item.Total ?? "-" }],
      };
    } else {
      ageCategories = Object.keys(data[0][tab]);
      return {
        name: item.optiontext, // Y-axis (Row Labels)
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
    dataLabels: { enabled: true },
    // colors: ["#FF5733", "#33FF57", "#3357FF"],
    colors: heatmapColors[filter]?.ranges.map((range) => range.color) || [
      "#767676",
    ],
    title: { text: "" },
    xaxis: {
      categories: ageCategories,
      style: {
        color: "red",
      },
    },
    yaxis: {
      title: { text: "Response" },
      labels: {
        style: {
          fontSize: "14px", // Increase font size
          colors: "#000", // Ensure visibility
          maxWidth: 200, // Increase label width to prevent cutoff
          whiteSpace: "break-spaces", // Allow text to wrap
          textOverflow: "ellipsis", // Ensure overflow handling
        },
      },
      // style: {
      //   color: "red",
      // },
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: heatmapColors[filter]?.ranges || [
            { from: -1000, to: 0, color: "#ba322b", name: "Negative" },
            { from: 0, to: 20, color: "#767676", name: "Neutral" },
            { from: 20, to: 1000, color: "#029109", name: "Positive" },
          ], // Default fallback
        },
      },
    },
  };

  return (
    <div className={styles.wrapper}>
      <Chart options={options} series={series} type="heatmap" height={400} />
    </div>
  );
};

export default HeatmapChart;
