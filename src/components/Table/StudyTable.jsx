import React from "react";
import styles from "./StudyTable.module.css";

/**
 *
 * @param {Array} headers - Array of header strings
 * @param {Array} data - Array of Objects representing rows
 */

const StudyTable = ({ headers, data, baseValues }) => {
  // console.log(study);
  console.log("data:= ",data)
  console.log("baseValues:= ",baseValues)
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.studyTable}>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>
              {header}
              <br />
              {baseValues[header] !== undefined && baseValues[header] !== null &&<span style={{ fontSize: "12px", fontWeight: "normal", color: "#666" }}>
                ({baseValues[header]  }) {/* Assuming `totals` is an object containing total values for each column */}
              </span>}
            </th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return (
              <tr key={index}>
                {headers.map((header, idx) => {
                  return <td key={idx}>{row[header] ?? "-"}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudyTable;