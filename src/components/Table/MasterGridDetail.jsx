import React, { useState, useEffect, useMemo } from "react";
import { themeAlpine } from "ag-grid-community";
import { colorSchemeDarkBlue } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

const MasterGridDetail = ({ tab, data }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

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

  const sanitizeKey = (key) =>
    key.replace(/[().]/g, "").replace(/\s+/g, "_").trim();

  useEffect(() => {
    console.log("[GRID DEBUG] Received tab:", tab);
    console.log("[GRID DEBUG] Received data:", data);

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
