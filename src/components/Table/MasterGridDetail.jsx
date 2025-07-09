import React, { useState, useEffect, useMemo } from "react";
import { themeQuartz } from "ag-grid-community";
import { colorSchemeDarkBlue } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

const MasterGridDetail = ({ tab, data, activeFilter, visibleColumns }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const [globalMinValue, setGlobalMinValue] = useState(0); // start with no filter

  const theme = themeQuartz.withParams({
    fontFamily: "Geist",
    headerFontFamily: "Geist",
    headerBackgroundColor: "#ffffff", // <-- white header
    headerFontColor: "#111827", // <-- dark text
    cellFontFamily: "Geist",
    rowBackgroundColor: "#ffffff", // even row
    oddRowBackgroundColor: "#f9fafb", // odd row, slightly off-white
    selectedRowBackgroundColor: "rgba(0, 255, 0, 0.1)",
    rangeSelectionBorderColor: "rgb(193, 0, 97)",
    rangeSelectionBorderStyle: "dashed",
    rangeSelectionBackgroundColor: "rgb(255, 0, 128, 0.1)",
    rangeSelectionHighlightColor: "rgb(60, 188, 0, 0.3)",
  });

  const rowSelection = useMemo(() => ({ mode: "multiRow" }), []);

  const sanitizeKey = (key) =>
    key.replace(/[().]/g, "").replace(/\s+/g, "_").trim();

  useEffect(() => {
    console.log("[GRID DEBUG] Received tab:", tab);
    console.log("[GRID DEBUG] Received data:", data);
    console.log("[GRID DEBUG] Received activeFilter:", activeFilter);
    console.log("[GRID DEBUG] visibleColumns:", visibleColumns);

    if (!Array.isArray(data)) {
      console.warn("[GRID WARN] Data is not an array!", data);
      setRowData([]);
      setColDefs([]);
      return;
    }

    if (data.length === 0) {
      console.warn("[GRID WARN] Data array is empty!");
      setRowData([]);
      setColDefs([]);
      return;
    }

    const allKeys = new Set();
    const sanitizedVisibleCols = visibleColumns?.map(sanitizeKey);
    const processedData = data.map((row) => {
      const newRow = {};
      Object.entries(row).forEach(([key, value]) => {
        const safeKey = sanitizeKey(key);
        allKeys.add(safeKey);
        let newVal;
        if (value === "" || value === null || value === undefined) {
          newVal = ""; // preserve blank
        } else if (!isNaN(value) && value !== "") {
          newVal = Number(value);
        } else {
          newVal = value;
        }
        newRow[safeKey] = newVal;
      });
      return newRow;
    });

    setRowData(processedData);

    const coreKeys = ["Question", "Option"];
    const orderedKeys = [
      ...coreKeys,
      ...Array.from(allKeys)
        .filter((key) => {
          const isNotCore = !coreKeys.includes(key);
          const isVisible = sanitizedVisibleCols?.includes(key);
          return isNotCore && isVisible;
        })
        .sort(),
    ];

    const columns = orderedKeys.map((sanitizedKey) => {
      const originalKey =
        Object.keys(data[0]).find((k) => sanitizeKey(k) === sanitizedKey) ||
        sanitizedKey;

      const isNumeric = data.some((row) => {
        const val = row[originalKey];
        return !isNaN(Number(val)) && val !== "" && val !== null;
      });

      return {
        field: sanitizedKey,
        headerName: originalKey,
        sortable: true,
        filter: isNumeric ? "agNumberColumnFilter" : "agTextColumnFilter",
        wrapText: true,
        autoHeight: true,
        valueFormatter: isNumeric
          ? (params) => {
              const val = params.value;
              if (val === "" || val === null || isNaN(val)) return "";
              return val;
            }
          : undefined,
        tooltipField: sanitizedKey,
        cellStyle: {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        cellRenderer: (params) => {
          const val = params.value;
          if (val == null || val === "") return "";
          // Convert Top-Down to green colors
          if (typeof val === "number" && activeFilter === "Top-Down") {
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
                        color: "black",
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
          // Convert Bottom-Up to red colors
          if (typeof val === "number" && activeFilter === "Bottom-Up") {
            return (
              <span
                style={
                  val > 16
                    ? {
                        backgroundColor: "#ee2704",
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
                        color: "black",
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
          // Convert Response-Time to yellow colors
          if (typeof val === "number" && activeFilter === "Response Time") {
            return (
              <span
                style={
                  val < 0.4
                    ? {
                        backgroundColor: "#fbff02",
                        color: "black",
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
                        color: "black",
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
          return val;
        },
      };
    });

    setColDefs(columns);
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
