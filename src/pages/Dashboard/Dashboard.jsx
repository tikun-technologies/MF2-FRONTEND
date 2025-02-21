import { useEffect, useState } from "react";
import { getStudies } from "../../api/getStudies";
import StudyCard from "../../components/StudyCard/StudyCard";
import styles from "./Dashboard.module.css";
import { HiPlus } from "react-icons/hi";
import SkeletonCard from "../../components/StudyCard/SkeletonCard";
import { Link } from "react-router-dom";
import StudyTable from "../../components/Table/StudyTable";

const Dashboard = () => {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch studies
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const studies = await getStudies();
        // console.log(typeof studies, studies.length, studies);
        // sort studies by recently created

        setStudies(studies.studies);
        setLoading(false);
      } catch (error) {
        console.error("error fetching studies:", error);
      }
    };
    fetchStudies();
  }, []);

  // Log studies
  // useEffect(() => {
  //   console.log("updated studies", studies);
  //   console.log(studies.length);
  // }, [studies]);

  return (
    <div className="container">
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerText}>My Dashboard</h1>
        {/* <button className="button">
          <HiPlus />
          Create New Study
        </button> */}
      </div>
      {/* Studies */}
      {loading
        ? [...Array(3)].map((_, index) => <SkeletonCard key={index} />)
        : studies.map((study) => (
            <Link
              to={`/study/${study._id}`}
              key={study._id}
              state={{ studies }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <StudyCard key={study._id} study={study} />
            </Link>
          ))}
    </div>
  );
};

export default Dashboard;
