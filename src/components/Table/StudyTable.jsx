import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import styles from "./StudyTable.module.css";

const operatorOptions = [
  { value: "range", label: "Range (between)" },
  { value: ">", label: "Greater than" },
  { value: "<", label: "Less than" },
  { value: "=", label: "Equal to" },
  { value: ">=", label: "Greater than or equal" },
  { value: "<=", label: "Less than or equal" }
];

const StudyTable = ({ 
  headers, 
  data, 
  baseValues, 
  globalRangeFilter,
  onLocalFilterChange 
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localRangeFilter, setLocalRangeFilter] = useState(globalRangeFilter);
  const [hasLocalChanges, setHasLocalChanges] = useState(false);

  // Sync with global filter when it changes
  useEffect(() => {
    if (!hasLocalChanges) {
      setLocalRangeFilter(globalRangeFilter);
    }
  }, [globalRangeFilter]);

  const shouldHighlightCell = (value, header) => {
    // Skip Response column and empty/non-numeric values
    if (header === "Response" || value === "-" || value === "N/A") return false;
    
    const numValue = Number(value);
    if (isNaN(numValue)) return false;

    const activeFilter = hasLocalChanges ? localRangeFilter : globalRangeFilter;
    
    // If no filter values are set, don't highlight anything
    if (!activeFilter.minValue && !activeFilter.maxValue && !activeFilter.singleValue) {
      return false;
    }

    // Apply the filter logic
    if (activeFilter.operator === "range") {
      const min = Number(activeFilter.minValue) || -Infinity;
      const max = Number(activeFilter.maxValue) || Infinity;
      return numValue >= min && numValue <= max;
    } else {
      const filterValue = Number(activeFilter.singleValue);
      if (isNaN(filterValue)) return false;
      
      switch (activeFilter.operator) {
        case ">": return numValue > filterValue;
        case "<": return numValue < filterValue;
        case "=": return numValue === filterValue;
        case ">=": return numValue >= filterValue;
        case "<=": return numValue <= filterValue;
        default: return false;
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilter = { ...localRangeFilter, [name]: value };
    updateFilters(newFilter);
  };

  const toggleShowFullRow = () => {
    const newFilter = {
      ...localRangeFilter,
      showFullRow: !localRangeFilter.showFullRow
    };
    updateFilters(newFilter);
  };

  const resetToGlobal = () => {
    updateFilters(globalRangeFilter);
    setHasLocalChanges(false);
  };

  const updateFilters = (newFilter) => {
    setLocalRangeFilter(newFilter);
    setHasLocalChanges(JSON.stringify(newFilter) !== JSON.stringify(globalRangeFilter));
    onLocalFilterChange(newFilter);
  };

  const filterData = () => {
    const activeFilter = hasLocalChanges ? localRangeFilter : globalRangeFilter;
    
    if (!activeFilter.minValue && !activeFilter.maxValue && !activeFilter.singleValue) {
      return { 
        filteredData: data, 
        visibleHeaders: headers
      };
    }

    const visibleHeaders = new Set(['Response']);
    
    const filteredData = data.filter(row => {
      if (activeFilter.showFullRow) return true;
      
      return Object.entries(row).some(([key, value]) => {
        if (key === "Response") return false;
        return shouldHighlightCell(value, key);
      });
    });

    return { 
      filteredData, 
      visibleHeaders: Array.from(visibleHeaders) 
    };
  };

  const { filteredData, visibleHeaders } = filterData();
  const activeFilter = hasLocalChanges ? localRangeFilter : globalRangeFilter;

  return (
    <div className={styles.tableContainer}>
      {/* Filter Header */}
      <div className={styles.filterHeader}>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={styles.filterButton}
          aria-label="Toggle filters"
        >
          <FiFilter className={
            activeFilter.minValue || 
            activeFilter.maxValue || 
            activeFilter.singleValue
              ? styles.activeFilterIcon 
              : styles.filterIcon
          } />
        </button>
        
        {showFilters && (
          <div className={styles.tableFilterControls}>
            <div className={styles.filterControls}>
              <select
                value={localRangeFilter.operator}
                onChange={(e) => {
                  updateFilters({
                    operator: e.target.value,
                    minValue: "",
                    maxValue: "",
                    singleValue: "",
                    showFullRow: localRangeFilter.showFullRow
                  });
                }}
                className={styles.operatorSelect}
              >
                {operatorOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {localRangeFilter.operator === "range" ? (
                <>
                  <input
                    type="number"
                    placeholder="Min"
                    name="minValue"
                    value={localRangeFilter.minValue}
                    onChange={handleFilterChange}
                    className={styles.filterInput}
                  />
                  <span className={styles.rangeTo}>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    name="maxValue"
                    value={localRangeFilter.maxValue}
                    onChange={handleFilterChange}
                    className={styles.filterInput}
                  />
                </>
              ) : (
                <input
                  type="number"
                  placeholder="Value"
                  name="singleValue"
                  value={localRangeFilter.singleValue}
                  onChange={handleFilterChange}
                  className={styles.filterInput}
                />
              )}
            </div>

            <div className={styles.filterActions}>
              <div className={styles.displayOption}>
                <label>
                  <input
                    type="checkbox"
                    checked={localRangeFilter.showFullRow}
                    onChange={toggleShowFullRow}
                  />
                  Show full rows
                </label>
              </div>
              <button 
                onClick={resetToGlobal}
                className={styles.resetButton}
                disabled={!hasLocalChanges}
              >
                Reset to Global
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <div className={styles.tableScrollContainer}>
          <table className={styles.studyTable}>
            <thead>
              <tr>
                {headers.map((header, index) => {
                  if (!activeFilter.showFullRow && !visibleHeaders.includes(header)) {
                    return null;
                  }
                  return (
                    <th key={index} style={{ width: `${100/headers.length}%` }}>
                      <div className={styles.headerContent}>
                        {header}
                        {baseValues[header] !== undefined && baseValues[header] !== null && (
                          <span className={styles.baseValue}>
                            <br />({baseValues[header]})
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            
            <tbody>
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => {
                    if (!activeFilter.showFullRow && !visibleHeaders.includes(header)) {
                      return null;
                    }
                    const cellValue = row[header] ?? "-";
                    const shouldHighlight = shouldHighlightCell(cellValue, header);
                    return (
                      <td 
                        key={colIndex} 
                        className={shouldHighlight ? styles.matchingCell : ""}
                        style={{ width: `${100/headers.length}%` }}
                      >
                        {cellValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudyTable;