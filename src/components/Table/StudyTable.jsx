import React from "react";

/**
 *
 * @param {Array} headers - Array of header strings
 * @param {Array} data - Array of Objects representing rows
 * @param {Object} baseValues - Object where keys are headers and values are their base values
 */

const StudyTable = ({ headers, data, baseValues }) => {
  // console.log("data:= ",data)
  // console.log("baseValues:= ",baseValues)
  return (
    <div className="shadow-lg rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => {
              return (
                <th
                  key={index}
                  scope="col"
                  className="!px-8 !py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider" // Increased font size to sm, weight to semibold, color to gray-600
                >
                  {header}
                  {baseValues && baseValues[header] !== undefined && baseValues[header] !== null && (
                    <span className="block text-xs font-medium text-gray-500 normal-case mt-1"> {/* Increased font size to xs, weight to medium, color to gray-500 */}
                      (Base: {baseValues[header]})
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => {
            return (
              <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                {headers.map((header, idx) => {
                  return (
                    <td key={idx} className="!px-8 !py-5 whitespace-nowrap text-base font-medium text-gray-800"> {/* Increased font size to base, weight to medium, color to gray-800 */}
                      {row[header] ?? <span className="text-gray-500">-</span>}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {/* Display a message if no data is available */}
          {data.length === 0 && (
            <tr>
              <td colSpan={headers.length} className="px-6 py-4 text-center text-sm text-gray-500">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudyTable;
