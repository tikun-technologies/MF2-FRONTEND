import React from "react";
import Chart from "react-apexcharts";

export const HeatmapChart = ({ data, tab }) => {
  console.log("data= ", data);
  console.log("Tab from study details:", tab);

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
    colors: ["#ba322b", "#767676", "#029109"],
    title: { text: "" },
    xaxis: { categories: ageCategories },
    yaxis: { title: { text: "Response" } },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            { from: -1000, to: 0, color: "#ba322b", name: "Negative" },
            { from: 0, to: 20, color: "#767676", name: "Neutral" },
            { from: 20, to: 1000, color: "#029109", name: "Positive" },
          ],
        },
      },
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="heatmap" height={350} />;
    </div>
  );
};

export default HeatmapChart;
