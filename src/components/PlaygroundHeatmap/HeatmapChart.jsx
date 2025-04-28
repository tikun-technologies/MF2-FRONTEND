import React from "react";
import Chart from "react-apexcharts";
import heatmapColors from "./heatmapColors";
import styles from "./Heatmap.module.css";

export const HeatmapChart = ({
  data,
  baseValues,
  selectedAgeKeys,
  selectedGenderKeys,
  selectedMindsetKeys,
  selectedPrelimKeys,
  filter,
  rangeFilter
}) => {
  const extractValues = (segment, selectedKeys) => {
    const result = {};
    if (Array.isArray(segment)) {
      selectedKeys.forEach((key) => {
        for (const obj of segment) {
          if (obj && obj[key] !== undefined) {
            result[key] = obj[key];
            break;
          }
        }
        if (!result[key]) result[key] = "-";
      });
    } else if (typeof segment === "object") {
      selectedKeys.forEach((key) => {
        result[key] = segment[key] ?? "-";
      });
    } else {
      selectedKeys.forEach((key) => (result[key] = "-"));
    }
    return result;
  };

  const shouldShowCell = (value) => {
    if (!rangeFilter ||
      (rangeFilter.operator === "range" && !rangeFilter.minValue && !rangeFilter.maxValue) ||
      (rangeFilter.operator !== "range" && !rangeFilter.singleValue)) {
      return true;
    }

    const numValue = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(numValue)) return false;

    switch (rangeFilter.operator) {
      case ">":
        return numValue > parseFloat(rangeFilter.singleValue);
      case "<":
        return numValue < parseFloat(rangeFilter.singleValue);
      case "=":
        return numValue === parseFloat(rangeFilter.singleValue);
      case ">=":
        return numValue >= parseFloat(rangeFilter.singleValue);
      case "<=":
        return numValue <= parseFloat(rangeFilter.singleValue);
      case "range":
        return numValue >= parseFloat(rangeFilter.minValue) &&
          numValue <= parseFloat(rangeFilter.maxValue);
      default:
        return true;
    }
  };

  const getSeriesData = () => {
    if (!data?.options) return [];

    return data.options
      .map((item) => {
        const ageData = extractValues(item["Age Segments"], selectedAgeKeys);
        const genderData = extractValues(item["Gender Segments"], selectedGenderKeys);
        const mindsetData = extractValues(item["Mindsets"], selectedMindsetKeys);
        const prelimData = extractValues(item["Prelim-Answer Segments"], selectedPrelimKeys);

        const allSegments = {
          ...ageData,
          ...genderData,
          ...mindsetData,
          ...prelimData
        };

        const filteredData = Object.entries(allSegments)
          .map(([category, value]) => {
            const numValue = typeof value === 'number' ? value : parseFloat(value);
            const validValue = isNaN(numValue) ? "-" : numValue;
            return {
              x: `${category}\n(${baseValues[category] ?? "-"})`,
              y: shouldShowCell(value) ? validValue : "-",
              fillColor: shouldShowCell(value) ? undefined : '#ffffff'
            };
          });

        return {
          name: item.optiontext,
          data: filteredData,
          shouldShow: rangeFilter.showFullRow || filteredData.some(item => item.y !== null && item.y !== "-")
        };
      })
      .filter(series => series.shouldShow);
  };

  const series = getSeriesData();
  const categories = [
    ...selectedAgeKeys,
    ...selectedGenderKeys,
    ...selectedMindsetKeys,
    ...selectedPrelimKeys
  ].map(category => `${category}\n(${baseValues[category] ?? "-"})`);

  const options = {
    chart: {
      type: "heatmap",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
      },
      animations: {
        enabled: false
      }
    },
    tooltip: {
      enabled: true,
      followCursor: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const val = series[seriesIndex][dataPointIndex];
        if (val === null || val === "-") return "";

        const rowLabel = w.globals.seriesNames[seriesIndex];
        const colLabel = w.globals.labels[dataPointIndex].split('\n')[0];

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
          ">
            <strong>${rowLabel}</strong><br />
            <em>${colLabel}</em>: ${val}
          </div>
        `;
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontWeight: 'normal',
        colors: ['#000']
      },
      formatter: function (val) {
        if (val === null || val === "-" || isNaN(val)) return "-";
        return val % 1 === 0 ? val : val.toFixed(1);
      }
    },
    colors: heatmapColors[filter]?.ranges.map((range) => range.color) || [
      "#767676",
    ],
    xaxis: {
      categories: categories,
      labels: {
        trim: false,
        hideOverlappingLabels: false,
        style: {
          fontSize: '10px',
          cssClass: 'heatmap-xaxis-label'
        }
      },
      axisBorder: {
        show: true
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    grid: {
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 0
      }
    },
    plotOptions: {
      heatmap: {
        radius: 0,
        enableShades: true,
        shadeIntensity: 0.5,
        reverseNegativeShade: true,
        distributed: false,
        useFillColorAsStroke: false,
        colorScale: {
          ranges: heatmapColors[filter]?.ranges || [
            { from: -1000, to: 0, color: "#ba322b", name: "Negative" },
            { from: 0, to: 20, color: "#767676", name: "Neutral" },
            { from: 20, to: 1000, color: "#029109", name: "Positive" },
          ],
        },
        dataLabels: {
          position: 'center'
        }
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Labels Container */}
      <div className={styles.labelsContainer}>
        {series.map((item, index) => (
          <div key={index} className={styles.labelItem} style={{
            height: '50px',
            display: 'flex',
            alignItems: 'center'
          }}>
            {item.name}
          </div>
        ))}
      </div>

      {/* Heatmap Chart */}
      <div className={styles.chartContainer}>
        <Chart
          options={options}
          series={series.slice().reverse()}
          type="heatmap"
          height={Math.max(300, series.length * 50)}
          width="100%"
        />
      </div>
    </div>
  );
};

export default HeatmapChart;
