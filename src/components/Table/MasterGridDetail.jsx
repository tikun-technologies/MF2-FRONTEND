import React, { useState, useEffect, useMemo } from "react";
import { themeQuartz } from "ag-grid-community";
import { colorSchemeDarkBlue } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

const MasterGridDetail = ({ tab, data, activeFilter }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

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
    const processedData = data.map((row) => {
      const newRow = {};
      Object.entries(row).forEach(([key, value]) => {
        const safeKey = sanitizeKey(key);
        allKeys.add(safeKey);
        const numVal = Number(value);
        newRow[safeKey] = isNaN(numVal) ? value : numVal;
      });
      return newRow;
    });

    setRowData(processedData);

    const orderedKeys = [
      "Question",
      "Option",
      "Overall",
      ...Array.from(allKeys)
        .filter((key) => !["Question", "Option", "Overall"].includes(key))
        .sort(),
    ];

    const columns = orderedKeys.map((sanitizedKey) => {
      const originalKey =
        Object.keys(data[0]).find((k) => sanitizeKey(k) === sanitizedKey) ||
        sanitizedKey;
      return {
        field: sanitizedKey,
        headerName: originalKey,
        sortable: true,
        filter: true,
        wrapText: true,
        autoHeight: true,
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
