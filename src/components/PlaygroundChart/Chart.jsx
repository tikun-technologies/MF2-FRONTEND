import React from "react";
import Chart from "react-apexcharts";
import heatmapColors from "../Heatmap/heatmapColors";
import styles from "./BarChart.module.css";

export const BarChart = ({ 
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

  const shouldShowValue = (value) => {
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

  const getBarColor = (value) => {
    const numValue = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(numValue)) return "#767676";

    const ranges = heatmapColors[filter]?.ranges || [
      { from: -1000, to: 0, color: "#ba322b", name: "Negative" },
      { from: 0, to: 20, color: "#767676", name: "Neutral" },
      { from: 20, to: 1000, color: "#029109", name: "Positive" },
    ];

    const matchingRange = ranges.find(range => 
      numValue >= range.from && numValue <= range.to
    );

    return matchingRange ? matchingRange.color : "#767676";
  };

  const getChartData = () => {
    if (!data?.options) return { series: [], categories: [] };
    
    const allCategories = [
      ...selectedAgeKeys,
      ...selectedGenderKeys,
      ...selectedMindsetKeys,
      ...selectedPrelimKeys
    ];

    const seriesData = data.options
      .map((item) => {
        const ageData = extractValues(item["Age Segments"], selectedAgeKeys);
        const genderData = extractValues(item["Gender Segments"], selectedGenderKeys);
        const mindsetData = extractValues(item["Mindsets"], selectedMindsetKeys);
        const prelimData = extractValues(item["Prelim-Answer Segments"], selectedPrelimKeys);

        const allValues = {
          ...ageData,
          ...genderData,
          ...mindsetData,
          ...prelimData
        };

        const filteredData = allCategories.map(category => ({
          x: category,
          y: shouldShowValue(allValues[category]) ? allValues[category] : null,
          fillColor: shouldShowValue(allValues[category]) ? getBarColor(allValues[category]) : 'transparent'
        }));

        return {
          name: item.optiontext,
          data: filteredData,
          shouldShow: rangeFilter.showFullRow || filteredData.some(item => item.y !== null)
        };
      })
      .filter(series => series.shouldShow);

    return {
      series: seriesData,
      categories: allCategories
    };
  };

  const { series, categories } = getChartData();

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        // ... (keep toolbar config same)
      },
      animations: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        columnWidth: '75%',  // Increased bar width
        barHeight: '95%',
        dataLabels: {
          position: 'top',
          hideOverflowingLabels: true
        }
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: '12px',
        fontWeight: 'bold',
        colors: ['#333']
      },
      offsetY: -25,
      formatter: function(val) {
        return val === null ? '' : (val % 1 === 0 ? val : val.toFixed(1));
      }
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif'
        },
        trim: true,
        hideOverlappingLabels: true,
        rotate: 0,
        height: 120
      },
      axisBorder: {
        show: true,
        color: '#e0e0e0'
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px'
        }
      },
      axisBorder: {
        show: true,
        color: '#e0e0e0'
      }
    },
    grid: {
      row: {
        colors: ['#f8f8f8', 'transparent'],
        opacity: 0.5
      },
      padding: {
        top: 50,  // Added space for top legend
        bottom: 20
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetY: -10,
      offsetX: 0,
      fontSize: '14px',
      markers: {
        width: 16,
        height: 16,
        radius: 4
      },
      itemMargin: {
        horizontal: 20,
        vertical: 8
      }
    },}

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chartContainer}>
        <Chart
          options={options}
          series={series.map(s => ({
            name: s.name,
            data: s.data.map(d => d.y)
          }))}
          type="bar"
          height={500}
          width="100%"
        />
      </div>
    </div>
  );
};

export default BarChart;