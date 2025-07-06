import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./StudyDetail.module.css";
import { getStudy } from "../api/getStudies";
import { FaRegFileExcel } from "react-icons/fa";
import { FaRegFilePowerpoint } from "react-icons/fa";
import { FiCalendar, FiUsers, FiBarChart } from "react-icons/fi";
import StudyTabs from "../../../components/Tabs/StudyTabs";
import { FilterProvider } from "../../../context/FilterContext";
import StudyFilters from "../../../components/Tabs/StudyFilters";
import ExportPage from "../../../components/ExportButton/ExportButton";
import Spinner from "../../../components/common/Spinner";
import AuthContext from "../../../context/AuthContext";
import StudyMetaCard from "../components/StudyMetaCard";
import { getStudyStatusBadge } from "../../../utils/getStudyStatusBadge";
import Badge from "../../../components/Badges/Badge";

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
        let study = await getStudy(id, token);
        study = study.study;
        console.log("study fetched from studyDetail page:", study);
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
              <div className={styles.studyHeaderTop}>
                <h2 className={styles.studyTitle}>{study.studyTitle}</h2>
                {/* <ExportPage /> */}
              </div>
              <div className={styles.studyStatus}>
                {/* Badge Logic */}
                {(() => {
                  const { type, text } = getStudyStatusBadge(study.studyStatus);
                  return <Badge type={type} badgeText={text} />;
                })()}
                <p className={styles.studyStatusDate}>
                  {study.studyStatus === "ongoing"
                    ? new Date().toLocaleDateString("en-GB")
                    : study.studyStatus}
                </p>
              </div>

              <div className={styles.studyMetadata}>
                {/* <span className={styles.studyRespondents}>
                    {study.studyStatus === "ongoing"
                      ? "Ongoing"
                      : "Completed on: " + study.studyStatus}
                  </span> */}
                <StudyMetaCard
                  icon={<FiCalendar />}
                  header={"Started"}
                  subtext={study.studyStarted}
                  theme={"blue"}
                />
                <StudyMetaCard
                  icon={<FiUsers />}
                  header={"Responses"}
                  subtext={`${study.studyRespondents} out of ${study.studyRespondents}`}
                  theme={"green"}
                />
                <StudyMetaCard
                  icon={<FiBarChart />}
                  header={"Completion"}
                  subtext={
                    study.studyStatus === "ongoing"
                      ? "Ongoing"
                      : study.studyStatus
                  }
                  theme={"purple"}
                />

                {/* <p>
                  Surveys Started: <span>{study.studyStarted}</span>
                </p>
                <p>
                  Surveys Completed:{" "}
                  <span className={styles.studyRespondents}>
                    {study.studyRespondents}
                  </span>{" "}
                  (out of {study.studyRespondents})
                </p> */}
              </div>
            </div>

            {/* <div className={styles.studyOptions}>
              <a>View Raw Data</a>
              <a>View Study Info</a>
            </div> */}
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
