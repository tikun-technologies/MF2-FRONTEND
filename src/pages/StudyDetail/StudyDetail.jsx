import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./StudyDetail.module.css";
import { getStudy } from "../../api/getStudies";
import ShimmerWrapper from "../../components/common/ShimmerWrapper";
import { FaRegFileExcel } from "react-icons/fa";
import { FaRegFilePowerpoint } from "react-icons/fa";
import StudyTabs from "../../components/Tabs/StudyTabs";
import { FilterProvider, useFilter } from "../../context/FilterContext";
import TabsContent from "../../components/Tabs/TabsContent";
import StudyFilters from "../../components/Tabs/StudyFilters";
import StudyTable from "../../components/Table/StudyTable";
import ExportPage from "../../components/ExportButton/ExportButton"

// Test study data
const headers = ["Response", "Overall"];
const data = [
  {
    Response: "The Mavericks wanted to redefine their team identity.",
    Overall: 16,
  },
  {
    Response:
      "It's all about money—the NBA thrives on blockbuster trades like this.",
    Overall: 18,
  },
];










const StudyDetail = () => {
  const [study, setStudy] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams(); // Get study id from url
  useEffect(() => {
    const fetchStudy = async (params) => {
      try {
        const study = await getStudy(id);
        console.log(study);
        setStudy(study);
        setLoading(false);
      } catch (error) {
        console.log("error fetching study:", error);
      }
    };
    fetchStudy();
  }, []);

  if (!study) {
    return <h1>Study not found</h1>;
  }

  return (<>
   
    <div id="page-content">
  
    <FilterProvider>
      <div className="container">
        <div className={styles.studyHeader}>
          <h1 className={styles.studyTitle}>{study.studyTitle}</h1>
          <ExportPage />
        </div>
        <div className={styles.studyMetadata}>
          <p>Status: <span className={styles.studyRespondents}>
              {study.studyStatus==="ongoing"? "Ongoing":"Completed on:-"+study.studyStatus}
            </span></p>
          <p>
            Surveys Started:{" "}
            <span >
              {study.studyStarted}
            </span>
          </p>
          <p>
            Surveys Completed:{" "}
            <span className={styles.studyRespondents}>
              {study.studyRespondents}
            </span>{" "}
            (out of {study.studyRespondents}){" "}
          </p>
        </div>
        <div className={styles.studyOptions}>
          <a>View Raw Data</a>
          <a>View Study Info</a>
        </div>
        {/* Test study table */}
        
        <StudyFilters />
        <StudyTabs study={study} />
        
        
        {/* <StudyTable study={study} data={data} headers={headers} /> */}
      </div>
    </FilterProvider>
    </div>
    </>
  );
};

export default StudyDetail;
