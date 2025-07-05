import React, { useState, useEffect, useMemo } from "react";
import { themeAlpine } from "ag-grid-community";
import { colorSchemeDarkBlue } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

const MasterGridDetail = ({ tab, data }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

  // Your existing theme configuration
  const theme = themeAlpine.withPart(colorSchemeDarkBlue).withParams({
    fontFamily: "Anek Devanagari",
    headerFontFamily: "Anek Devanagari",
    cellFontFamily: "Anek Devanagari",
    selectedRowBackgroundColor: "rgba(0, 255, 0, 0.1)",
    rangeSelectionBorderColor: "rgb(193, 0, 97)",
    rangeSelectionBorderStyle: "dashed",
    rangeSelectionBackgroundColor: "rgb(255, 0, 128, 0.1)",
    rangeSelectionHighlightColor: "rgb(60, 188, 0, 0.3)",
    oddRowBackgroundColor: "#8881",
  });

  const rowSelection = useMemo(() => ({ mode: "multiRow" }), []);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      // Process data to ensure all values are properly formatted
      const processedData = data.map((row) => {
        const newRow = {};
        Object.keys(row).forEach((key) => {
          // Convert all values to numbers where possible
          const numValue = Number(row[key]);
          newRow[key] = isNaN(numValue) ? row[key] : numValue;
        });
        return newRow;
      });

      setRowData(processedData);

      // Get all unique keys from all rows
      const allKeys = new Set();
      processedData.forEach((row) => {
        Object.keys(row).forEach((key) => allKeys.add(key));
      });
      console.log("all keys = ,", allKeys);
      // Create ordered columns (Question, Option, Total first)
      const orderedKeys = [
        "Question",
        "Option",
        "Overall",
        ...Array.from(allKeys)
          .filter((key) => !["Question", "Option", "Overall"].includes(key))
          .sort(),
      ];

      const columns = orderedKeys.map((key) => ({
        field: key,
        headerName: key,
        sortable: true,
        filter: true,
        wrapText: true,
        autoHeight: true,
        tooltipField: key,
        cellStyle: {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        cellRenderer: (params) => {
          const val = params.value;

          // Handle null/undefined/empty
          if (val == null || val === "") return "";

          // Handle numbers
          if (typeof val === "number") {
            return (
              <span
                style={
                  val > 20
                    ? {
                        backgroundColor: "#198754",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "32px",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        display: "inline-flex",
                        alignItems: "center",
                        minWidth: "24px",
                        height: "16px",
                        lineHeight: "1",
                      }
                    : {
                        color: "white",
                        padding: "0 8px",
                        borderRadius: "999px",
                        fontSize: "0.8rem",
                        display: "inline-flex",
                        alignItems: "center",
                        minWidth: "24px",
                        height: "10px",
                        lineHeight: "1",
                      }
                }
              >
                {val.toLocaleString()}
              </span>
            );
          }

          // Default string rendering
          return val;
        },
      }));

      setColDefs(columns);
    } else {
      setRowData([]);
      setColDefs([]);
    }
  }, [data]);

  return (
    <div style={{ width: "100%", height: "800px" }}>
      <AgGridReact
        theme={theme}
        rowSelection={rowSelection}
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        cellSelection={true}
        enableCharts={true}
      />
    </div>
  );
};

export default MasterGridDetail;
