import { useEffect, useState, useContext } from "react";
import { getStudies } from "../../api/getStudies";
import AuthContext from "../../context/AuthContext";
import StudyCard from "../../components/StudyCard/StudyCard";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import SkeletonCard from "../../components/StudyCard/SkeletonCard";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudies = async () => {
      if (!token) {
        console.warn("No authentication token found. Redirecting to login...");
        return;
      }

      try {
        console.log("🔍 Fetching studies with token:", token);
        const response = await getStudies(token);
        setStudies(response.studies);
        console.log("Studies Retrieved: ", studies);
      } catch (err) {
        console.error("❌ Error fetching studies:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, [token]);

  return (
    <div className="container">
      <div className={styles.header}>
        <h1 className={styles.headerText}>My Studies</h1>
      </div>
      {error && <p className={styles.errorMessage}>⚠️ {error}</p>}
      {loading
        ? [...Array(3)].map((_, index) => <SkeletonCard key={index} />)
        : studies.map((study) => (
            <Link
              to={`/study/${study._id}`}
              key={study._id}
              state={{ study }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <StudyCard key={study._id} study={study} />
            </Link>
          ))}
    </div>
  );
};

export default Dashboard;
