import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getStudy } from "../../api/getStudies";
import Spinner from "../../components/common/Spinner";
import StudyTable from "../../components/Table/StudyTable";
import HeatmapChart from "./../Heatmap/HeatmapChart";
import BarChart from "../Chart/Chart";
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

  const resetToInitial = () => {
    setRangeFilter({
      operator: "range",
      minValue: "",
      maxValue: "",
      singleValue: "",
      showFullRow: true
    });
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

    setSelectedAge(ageOpts);
    setSelectedGender(genderOpts);
    setSelectedMindset(mindsetOpts);
    setSelectedPrelim(prelimOpts);
  }, [study]);

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
  
  
  const generateTableForQuestion = (question) => {
    if (!question?.options || !Array.isArray(question.options)) return null;

    const tableHeaders = [
      "Response",
      ...selectedAgeKeys,
      ...selectedGenderKeys,
      ...selectedMindsetKeys,
      ...selectedPrelimKeys,
    ];

    const tableData = question.options.map((opt) => ({
      Response: opt?.optiontext || "N/A",
      ...extractValues(opt["Age Segments"], selectedAgeKeys),
      ...extractValues(opt["Gender Segments"], selectedGenderKeys),
      ...extractValues(opt["Mindsets"], selectedMindsetKeys),
      ...extractValues(opt["Prelim-Answer Segments"], selectedPrelimKeys),
    }));

    return (
      <div key={question.Question} className="mb-8">
        {tableHeaders.length > 1 && (
          <>
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
          </>
        )}
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
          selectedAgeKeys={selectedAgeKeys}
          selectedGenderKeys={selectedGenderKeys}
          selectedMindsetKeys={selectedMindsetKeys}
          selectedPrelimKeys={selectedPrelimKeys}
          filter={rangeFilter.operator}
          rangeFilter={rangeFilter}
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
          selectedAgeKeys={selectedAgeKeys}
          selectedGenderKeys={selectedGenderKeys}
          selectedMindsetKeys={selectedMindsetKeys}
          selectedPrelimKeys={selectedPrelimKeys}
          filter={rangeFilter.operator}
          rangeFilter={rangeFilter}
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
                Reset
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
              onChange={setSelectedAge}
              className="react-select-container"
              classNamePrefix="react-select"
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
              onChange={setSelectedGender}
              className="react-select-container"
              classNamePrefix="react-select"
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
              onChange={setSelectedMindset}
              className="react-select-container"
              classNamePrefix="react-select"
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
              onChange={setSelectedPrelim}
              className="react-select-container"
              classNamePrefix="react-select"
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