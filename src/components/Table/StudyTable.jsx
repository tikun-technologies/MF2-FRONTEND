import React, { useState, useEffect } from "react";

/**
 *
 * @param {Array} headers - Array of header strings
 * @param {Array} data - Array of Objects representing rows
 * @param {Object} baseValues - Object where keys are headers and values are their base values
 */

const StudyTable = ({ headers, data, baseValues }) => {
  // Filter state
  const [selectedColumn, setSelectedColumn] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterValue1, setFilterValue1] = useState("");
  const [filterValue2, setFilterValue2] = useState("");
  const [highlightedCells, setHighlightedCells] = useState(new Map());

  // Get numeric columns for filtering
  const getNumericColumns = () => {
    const numericColumns = [];

    if (data.length > 0) {
      headers.forEach(header => {
        // Check if at least one row has a numeric value for this column
        const hasNumericValue = data.some(row => {
          const value = row[header];
          return value !== null && value !== undefined && !isNaN(parseFloat(value));
        });

        if (hasNumericValue) {
          numericColumns.push(header);
        }
      });
    }

    return numericColumns;
  };

  const numericColumns = getNumericColumns();

  // Apply filter and highlight matching cells
  const applyFilter = () => {
    if (!selectedColumn || !filterType) {
      setHighlightedCells(new Map());
      return;
    }

    const newHighlighted = new Map();
    const val1 = parseFloat(filterValue1);
    const val2 = parseFloat(filterValue2);

    data.forEach((row, rowIndex) => {
      const cellValue = parseFloat(row[selectedColumn]);

      if (isNaN(cellValue)) return; // Skip non-numeric values

      let isMatched = false;
      switch (filterType) {
        case "greaterThan":
          isMatched = !isNaN(val1) && cellValue > val1;
          break;
        case "lessThan":
          isMatched = !isNaN(val1) && cellValue < val1;
          break;
        case "equalTo":
          isMatched = !isNaN(val1) && cellValue === val1;
          break;
        case "between":
          isMatched = !isNaN(val1) && !isNaN(val2) && cellValue >= val1 && cellValue <= val2;
          break;
        default:
          break;
      }

      if (isMatched) {
        newHighlighted.set(`${rowIndex}-${selectedColumn}`, true);
      }
    });

    setHighlightedCells(newHighlighted);
  };

  // Clear all filters
  const clearFilter = () => {
    setSelectedColumn("");
    setFilterType("");
    setFilterValue1("");
    setFilterValue2("");
    setHighlightedCells(new Map());
  };

  // Reset highlights when data changes
  useEffect(() => {
    setHighlightedCells(new Map());
  }, [data]);

  return (
    <div>
      {numericColumns.length > 0 && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
          <div className="flex flex-wrap items-end gap-4">
            {/* Column selector */}
            <div>
              <label htmlFor="columnSelect" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Column:
              </label>
              <select
                id="columnSelect"
                value={selectedColumn}
                onChange={(e) => {
                  setSelectedColumn(e.target.value);
                  setFilterType("");
                  setFilterValue1("");
                  setFilterValue2("");
                }}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Column</option>
                {numericColumns.map((column) => (
                  <option key={column} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter type selector - only show if column is selected */}
            {selectedColumn && (
              <div>
                <label htmlFor="filterType" className="block text-sm font-medium text-gray-700 mb-1">
                  Filter Type:
                </label>
                <select
                  id="filterType"
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setFilterValue1("");
                    setFilterValue2("");
                  }}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select Filter Type</option>
                  <option value="greaterThan">Greater Than</option>
                  <option value="lessThan">Less Than</option>
                  <option value="equalTo">Equal To</option>
                  <option value="between">Between</option>
                </select>
              </div>
            )}

            {/* Single value input - for greater than, less than, equal to */}
            {selectedColumn && filterType && filterType !== "between" && (
              <div>
                <label htmlFor="filterValue1" className="block text-sm font-medium text-gray-700 mb-1">
                  Value:
                </label>
                <input
                  type="number"
                  id="filterValue1"
                  value={filterValue1}
                  onChange={(e) => setFilterValue1(e.target.value)}
                  placeholder={`Enter ${selectedColumn} value`}
                  className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                />
                {baseValues && baseValues[selectedColumn] !== undefined && (
                  <span className="text-xs text-gray-500 mt-1 block">
                    Base value: {baseValues[selectedColumn]}
                  </span>
                )}
              </div>
            )}

            {/* Double value input - for between */}
            {selectedColumn && filterType === "between" && (
              <>
                <div>
                  <label htmlFor="filterValue1" className="block text-sm font-medium text-gray-700 mb-1">
                    Min Value:
                  </label>
                  <input
                    type="number"
                    id="filterValue1"
                    value={filterValue1}
                    onChange={(e) => setFilterValue1(e.target.value)}
                    placeholder={`Min ${selectedColumn}`}
                    className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label htmlFor="filterValue2" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Value:
                  </label>
                  <input
                    type="number"
                    id="filterValue2"
                    value={filterValue2}
                    onChange={(e) => setFilterValue2(e.target.value)}
                    placeholder={`Max ${selectedColumn}`}
                    className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                  />
                </div>
              </>
            )}

            {/* Filter action buttons */}
            {selectedColumn && filterType && (
              <button
                onClick={applyFilter}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply Filter
              </button>
            )}

            <button
              onClick={clearFilter}
              className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Clear Filter
            </button>
          </div>
        </div>
      )}

      <div className="shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-zinc-700">
            <tr>
              {headers.map((header, index) => {
                return (
                  <th
                    key={index}
                    scope="col"
                    className="!px-8 !py-4 text-left text-sm font-semibold text-white uppercase tracking-wider" // Increased font size to sm, weight to semibold, color to gray-600
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
            {data.map((row, rowIndex) => {
              return (
                <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-150">
                  {headers.map((header, colIndex) => {
                    const isHighlighted = highlightedCells.has(`${rowIndex}-${header}`);
                    return (
                      <td
                        key={colIndex}
                        className={`!px-8 !py-5 whitespace-nowrap text-base font-medium ${isHighlighted ? 'bg-yellow-100 outline outline-2 outline-blue-500' : 'text-gray-800'}`}
                      >
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
    </div>
  );
};

export default StudyTable;
