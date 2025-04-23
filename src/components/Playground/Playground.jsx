import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getStudy } from "../../api/getStudies";
import Spinner from "../../components/common/Spinner";
import StudyTable from "../PlaygroundTable/StudyTable";
import HeatmapChart from "./../PlaygroundHeatmap/HeatmapChart";
import BarChart from "../PlaygroundChart/Chart";
import "./StudyPlayground.css";
import styles from "./StudyPlayground.module.css";

const operatorOptions = [
  { value: "range", label: "Range (between)" },
  { value: ">", label: "Greater than" },
  { value: "<", label: "Less than" },
  { value: "=", label: "Equal to" },
  { value: ">=", label: "Greater than or equal" },
  { value: "<=", label: "Less than or equal" }
];

const StudyPlayground = ({ study, visualType }) => {
  const [loading, setLoading] = useState(false);
  const [segmentKeys, setSegmentKeys] = useState([]);
  const [tableFilters, setTableFilters] = useState({});
  const [ageOptions, setAgeOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [mindsetOptions, setMindsetOptions] = useState([]);
  const [prelimOptions, setPrelimOptions] = useState([]);
  
  // Initialize all selections as empty (will show all data without labels)
  const [selectedAge, setSelectedAge] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedMindset, setSelectedMindset] = useState([]);
  const [selectedPrelim, setSelectedPrelim] = useState([]);

  const [rangeFilter, setRangeFilter] = useState({
    operator: "range",
    minValue: "",
    maxValue: "",
    singleValue: "",
    showFullRow: true
  });

  // Track if user has made any selections
  const [hasUserSelection, setHasUserSelection] = useState(false);

  const resetToInitial = () => {
    setRangeFilter({
      operator: "range",
      minValue: "",
      maxValue: "",
      singleValue: "",
      showFullRow: true
    });
    setSelectedAge([]);
    setSelectedGender([]);
    setSelectedMindset([]);
    setSelectedPrelim([]);
    setHasUserSelection(false);
  };

  useEffect(() => {
    if (!study) return;

    const keys = Object.keys(study?.studyData || {});
    setSegmentKeys(keys);
    
    const firstSheetData = study?.Data?.Questions?.[0]?.options || [];
    
    const getUniqueKeys = (key) => {
      const keys = new Set();
      firstSheetData.forEach((opt) => {
        const segment = opt[key];
        if (Array.isArray(segment)) {
          segment.forEach((obj) => {
            if (obj && typeof obj === "object") {
              Object.keys(obj).forEach((k) => keys.add(k));
            }
          });
        } else if (segment && typeof segment === "object") {
          Object.keys(segment).forEach((k) => keys.add(k));
        }
      });
      return [...keys].map((k) => ({ label: k, value: k }));
    };

    const ageOpts = getUniqueKeys("Age Segments");
    const genderOpts = getUniqueKeys("Gender Segments");
    const mindsetOpts = getUniqueKeys("Mindsets");
    const prelimOpts = getUniqueKeys("Prelim-Answer Segments");

    setAgeOptions(ageOpts);
    setGenderOptions(genderOpts);
    setMindsetOptions(mindsetOpts);
    setPrelimOptions(prelimOpts);
  }, [study]);

  // Check if user has made any selections
  useEffect(() => {
    if (selectedAge.length > 0 || selectedGender.length > 0 || 
        selectedMindset.length > 0 || selectedPrelim.length > 0) {
      setHasUserSelection(true);
    } else {
      setHasUserSelection(false);
    }
  }, [selectedAge, selectedGender, selectedMindset, selectedPrelim]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!study) return <div className="p-6 text-center text-gray-500">No study data available</div>;

  const selectedAgeKeys = selectedAge.map((x) => x.value);
  const selectedGenderKeys = selectedGender.map((x) => x.value);
  const selectedMindsetKeys = selectedMindset.map((x) => x.value);
  const selectedPrelimKeys = selectedPrelim.map((x) => x.value);

  const questions = study?.Data?.Questions || [];
  const baseValues = study?.["Base Values"] || {};

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

  const generateTableHeaders = (question) => {
    // When no user selections, just show "Response" and "Value"
    if (!hasUserSelection) {
      return ["Response", "Value"];
    }

    // When user has made selections, show selected segments
    const headers = ["Response"];
    
    if (selectedAge.length > 0) {
      headers.push(...selectedAgeKeys.map(key => `Age: ${key}`));
    }
    
    if (selectedGender.length > 0) {
      headers.push(...selectedGenderKeys.map(key => `Gender: ${key}`));
    }
    
    if (selectedMindset.length > 0) {
      headers.push(...selectedMindsetKeys.map(key => `Mindset: ${key}`));
    }
    
    if (selectedPrelim.length > 0) {
      headers.push(...selectedPrelimKeys.map(key => `Prelim: ${key}`));
    }

    return headers;
  };

  const generateTableForQuestion = (question) => {
    if (!question?.options || !Array.isArray(question.options)) return null;

    const tableHeaders = generateTableHeaders(question);

    const tableData = question.options.map((opt) => {
      if (!hasUserSelection) {
        // When no selections, show aggregated values
        return {
          Response: opt?.optiontext || "N/A",
          Value: opt?.aggregatedValue || "-" // Assuming there's an aggregated value field
        };
      }

      // When selections exist, show segmented data
      const row = {
        Response: opt?.optiontext || "N/A"
      };

      if (selectedAge.length > 0) {
        Object.assign(row, extractValues(opt["Age Segments"], selectedAgeKeys));
      }
      
      if (selectedGender.length > 0) {
        Object.assign(row, extractValues(opt["Gender Segments"], selectedGenderKeys));
      }
      
      if (selectedMindset.length > 0) {
        Object.assign(row, extractValues(opt["Mindsets"], selectedMindsetKeys));
      }
      
      if (selectedPrelim.length > 0) {
        Object.assign(row, extractValues(opt["Prelim-Answer Segments"], selectedPrelimKeys));
      }

      return row;
    });

    return (
      <div key={question.Question} className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{question.Question}</h2>
        <StudyTable 
          headers={tableHeaders} 
          data={tableData} 
          baseValues={baseValues}
          globalRangeFilter={rangeFilter}
          onLocalFilterChange={(newFilter) => {
            setTableFilters(prev => ({
              ...prev,
              [question.Question]: newFilter
            }));
          }}
          key={`${question.Question}-${JSON.stringify(rangeFilter)}`}
        />
      </div>
    );
  };

  const generateHeatmapForQuestion = (question) => {
    return (
      <div key={question.Question} className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{question.Question}</h2>
        <HeatmapChart 
          data={question}
          baseValues={baseValues}
          selectedAgeKeys={hasUserSelection ? selectedAgeKeys : []}
          selectedGenderKeys={hasUserSelection ? selectedGenderKeys : []}
          selectedMindsetKeys={hasUserSelection ? selectedMindsetKeys : []}
          selectedPrelimKeys={hasUserSelection ? selectedPrelimKeys : []}
          filter={rangeFilter.operator}
          rangeFilter={rangeFilter}
          showAggregated={!hasUserSelection}
        />
      </div>
    );
  };

  const generateBarChartForQuestion = (question) => {
    return (
      <div key={question.Question} className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{question.Question}</h2>
        <BarChart 
          data={question}
          baseValues={baseValues}
          selectedAgeKeys={hasUserSelection ? selectedAgeKeys : []}
          selectedGenderKeys={hasUserSelection ? selectedGenderKeys : []}
          selectedMindsetKeys={hasUserSelection ? selectedMindsetKeys : []}
          selectedPrelimKeys={hasUserSelection ? selectedPrelimKeys : []}
          filter={rangeFilter.operator}
          rangeFilter={rangeFilter}
          showAggregated={!hasUserSelection}
        />
      </div>
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setRangeFilter(prev => ({ ...prev, [name]: value }));
  };

  const toggleShowFullRow = () => {
    setRangeFilter(prev => ({
      ...prev,
      showFullRow: !prev.showFullRow
    }));
  };

  const handleSegmentChange = (setter, selectedOptions) => {
    setter(selectedOptions);
    // Any selection change will trigger user selection mode
    if (selectedOptions.length > 0) {
      setHasUserSelection(true);
    }
  };

  return (
    <div className="study-container">
      {/* Common Range Filter */}
      <div className={styles.filterControlsWrapper}>
        <div className={styles.rangeFilterContainer}>
          <label className={styles.filterLabel}>Range Filter</label>
          
          <div className={styles.filterControls}>
            <select
              value={rangeFilter.operator}
              onChange={(e) => setRangeFilter({
                operator: e.target.value,
                minValue: "",
                maxValue: "",
                singleValue: "",
                showFullRow: rangeFilter.showFullRow
              })}
              className={styles.operatorSelect}
            >
              {operatorOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {rangeFilter.operator === "range" ? (
              <>
                <input
                  type="number"
                  placeholder="Min"
                  name="minValue"
                  value={rangeFilter.minValue}
                  onChange={handleFilterChange}
                  className={styles.rangeInput}
                />
                <span className={styles.rangeTo}>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  name="maxValue"
                  value={rangeFilter.maxValue}
                  onChange={handleFilterChange}
                  className={styles.rangeInput}
                />
              </>
            ) : (
              <input
                type="number"
                placeholder="Value"
                name="singleValue"
                value={rangeFilter.singleValue}
                onChange={handleFilterChange}
                className={styles.rangeInput}
              />
            )}
          </div>
          <div className={styles.filterActions}>
            <div className={styles.displayOption}>
              <label>
                <input
                  type="checkbox"
                  checked={rangeFilter.showFullRow}
                  onChange={toggleShowFullRow}
                />
                Show full rows
              </label>
            </div>
            <button 
              onClick={resetToInitial}
              className={styles.resetButton}
            >
              Reset All
            </button>
          </div>
        </div>
      </div>

      {/* Segment Filters Row */}
      <div className="filters-row">
        {ageOptions.length > 0 && (
          <div className="filter-group">
            <label>Age Segments</label>
            <Select
              isMulti
              options={ageOptions}
              value={selectedAge}
              onChange={(options) => handleSegmentChange(setSelectedAge, options)}
              className="react-select-container"
              classNamePrefix="react-select"
              closeMenuOnSelect={false}
              placeholder="Select age segments..."
              menuPortalTarget={document.body}
              menuPosition="fixed"
              styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 }),
                menu: provided => ({ 
                  ...provided, 
                  position: 'absolute',
                  width: 'auto',
                  minWidth: '100%'
                })
              }}
            />
          </div>
        )}

        {genderOptions.length > 0 && (
          <div className="filter-group">
            <label>Gender Segments</label>
            <Select
              isMulti
              options={genderOptions}
              value={selectedGender}
              onChange={(options) => handleSegmentChange(setSelectedGender, options)}
              className="react-select-container"
              classNamePrefix="react-select"
              closeMenuOnSelect={false}
              placeholder="Select gender segments..."
              menuPortalTarget={document.body}
              menuPosition="fixed"
              styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 }),
                menu: provided => ({ ...provided, position: 'absolute' })
              }}
            />
          </div>
        )}

        {mindsetOptions.length > 0 && (
          <div className="filter-group">
            <label>Mindsets</label>
            <Select
              isMulti
              options={mindsetOptions}
              value={selectedMindset}
              onChange={(options) => handleSegmentChange(setSelectedMindset, options)}
              className="react-select-container"
              classNamePrefix="react-select"
              closeMenuOnSelect={false}
              placeholder="Select mindsets..."
              menuPortalTarget={document.body}
              menuPosition="fixed"
              styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 }),
                menu: provided => ({ ...provided, position: 'absolute' })
              }}
            />
          </div>
        )}

        {prelimOptions.length > 0 && (
          <div className="filter-group">
            <label>Prelim Segments</label>
            <Select
              isMulti
              options={prelimOptions}
              value={selectedPrelim}
              onChange={(options) => handleSegmentChange(setSelectedPrelim, options)}
              className="react-select-container"
              classNamePrefix="react-select"
              closeMenuOnSelect={false}
              placeholder="Select prelim segments..."
              menuPortalTarget={document.body}
              menuPosition="fixed"
              styles={{
                menuPortal: base => ({ ...base, zIndex: 9999 }),
                menu: provided => ({ ...provided, position: 'absolute' })
              }}
            />
          </div>
        )}
      </div>

      {/* Questions Section */}
      <div className="questions-section">
        {questions.map((question) => {
          switch(visualType) {
            case "table":
              return generateTableForQuestion(question);
            case "heatmap":
              return generateHeatmapForQuestion(question);
            default:
              return generateBarChartForQuestion(question);
          }
        })}
      </div>
    </div>
  );
};

export default StudyPlayground;