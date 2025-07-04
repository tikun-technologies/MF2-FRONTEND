import React, { useState, useEffect, useMemo } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { themeAlpine } from "ag-grid-community";

import { colorSchemeDarkBlue } from "ag-grid-community";

// 3. Import the React Data Grid Component
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { studyTestData } from "./StudyTestData";

// 4. Define the rows and columns

const MasterGridDetail = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

  const theme = themeAlpine.withPart(colorSchemeDarkBlue).withParams({
    fontFamily: "Anek Devanagari",
    headerFontFamily: "Anek Devanagari",
    cellFontFamily: "Anek Devanagari",
    selectedRowBackgroundColor: "rgba(0, 255, 0, 0.1)",
    // color and style of border around selection
    rangeSelectionBorderColor: "rgb(193, 0, 97)",
    rangeSelectionBorderStyle: "dashed",
    // background color of selection - you can use a semi-transparent color
    // and it wil overlay on top of the existing cells
    rangeSelectionBackgroundColor: "rgb(255, 0, 128, 0.1)",
    // color used to indicate that data has been copied form the cell range
    rangeSelectionHighlightColor: "rgb(60, 188, 0, 0.3)",

    // alternating row colors will be visible through the semi-transparent
    // selection background color
    oddRowBackgroundColor: "#8881",
  });

  console.log("Alpine properties: ", theme);

  const rowSelection = useMemo(() => {
    return { mode: "multiRow" };
  }, []);

  useEffect(() => {
    if (studyTestData && studyTestData.length > 0) {
      setRowData(studyTestData);

      const firstRow = studyTestData[0];
      const columns = Object.keys(firstRow)
        .filter((key) => key !== "") // optionally filter out empty keys
        .map((key, index) => ({
          field: key,
          headerName: key,
          sortable: true,
          filter: true,
          wrapText: true,
          autoHeight: true,
          cellStyle: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "wrap",
          },
          cellRenderer:
            key === "Successful"
              ? (params) => (params.value ? "✔️" : "❌")
              : (params) => {
                  const val = params.value;

                  // ✅ Only apply style for numeric values > 20
                  if (typeof val === "number" && val > 20) {
                    return (
                      <span
                        style={{
                          backgroundColor: "#198754",
                          color: "white",
                          paddingTop: "4px",
                          paddingLeft: "8px",
                          paddingRight: "8px",
                          borderRadius: "32px",
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "24px",
                          height: "16px",
                          lineHeight: "1",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {val.toLocaleString()}
                      </span>
                    );
                  }

                  // Otherwise, just return plain value
                  return (
                    <span
                      style={{
                        // backgroundColor: "#198754",
                        color: "white",

                        paddingLeft: "8px",
                        paddingRight: "8px",
                        borderRadius: "999px",
                        // fontWeight: 600,
                        fontSize: "0.8rem",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "24px",
                        height: "10px",
                        lineHeight: "1",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {val.toLocaleString()}
                    </span>
                  );
                },
          tooltipField: key,
        }));

      setColDefs(columns);
    }
  }, []);

  //   const defaultColDef = {
  //     flex: 1,
  //   };

  // // 5. React Data Grid Component
  return (
    // Data Grid will fill the size of the parent container
    <div style={{ width: "100%", height: "800px" }}>
      <AgGridReact
        theme={theme}
        rowSelection={rowSelection}
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true} // Enable Pagination
        // rowSelection="multiple"
        cellSelection={true}
        enableCharts={true}
        // rowHeight={40}
        // defaultColDef={defaultColDef}
      />
    </div>
  );

  // ...
};

export default MasterGridDetail;
