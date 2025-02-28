import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./StudyDetail.module.css";
import { getStudy } from "../../api/getStudies";
import { FaRegFileExcel } from "react-icons/fa";
import { FaRegFilePowerpoint } from "react-icons/fa";
import StudyTabs from "../../components/Tabs/StudyTabs";
import { FilterProvider } from "../../context/FilterContext";
import StudyFilters from "../../components/Tabs/StudyFilters";
import ExportPage from "../../components/ExportButton/ExportButton";
import Spinner from "../../components/common/Spinner";
import AuthContext from "../../context/AuthContext";

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
  const { token } = useContext(AuthContext);

  const { id } = useParams(); // Get study id from url

  useEffect(() => {
    const fetchStudy = async () => {
      if (!token) {
        console.warn("No authentication token found. Redirecting to login...");
        return;
      }

      try {
        const study = await getStudy(id, token);
        console.log(study);
        setStudy(study);
      } catch (error) {
        console.log("error fetching study:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudy();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (!study) {
    return <h1>Study not found</h1>;
  }

  return (
    <>
      <div id="page-content">
        <FilterProvider>
          <div className="container">
            <div className={styles.studyHeader}>
              <h1 className={styles.studyTitle}>{study.studyTitle}</h1>
              <ExportPage />
            </div>
            <div className={styles.studyMetadata}>
              <p>
                Status:{" "}
                <span className={styles.studyRespondents}>
                  {study.studyStatus === "ongoing"
                    ? "Ongoing"
                    : "Completed on: " + study.studyStatus}
                </span>
              </p>
              <p>
                Surveys Started: <span>{study.studyStarted}</span>
              </p>
              <p>
                Surveys Completed:{" "}
                <span className={styles.studyRespondents}>
                  {study.studyRespondents}
                </span>{" "}
                (out of {study.studyRespondents})
              </p>
            </div>
            <div className={styles.studyOptions}>
              <a>View Raw Data</a>
              <a>View Study Info</a>
            </div>
            {/* Study Filters and Tabs */}
            <StudyFilters />
            <StudyTabs study={study} />
          </div>
        </FilterProvider>
      </div>
    </>
  );
};

export default StudyDetail;
