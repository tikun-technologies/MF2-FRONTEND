import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getStudies } from "../../api/getStudies";
import AuthContext from "../../context/AuthContext";
import StudyCard from "../../components/StudyCard/StudyCard";
import SkeletonCard from "../../components/StudyCard/SkeletonCard";
import AddStudy from "../../features/studies/components/AddStudy"; // Import modal
import styles from "./Dashboard.module.css";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudies();
  }, [token]);

  // Fetch studies from API
  const fetchStudies = async () => {
    if (!token) {
      console.warn("No authentication token found. Redirecting to login...");
      return;
    }

    setLoading(true);
    try {
      console.log("🔍 Fetching studies with token:", token);
      const response = await getStudies(token);
      setStudies(response.studies);
    } catch (err) {
      console.error("❌ Error fetching studies:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Callback for modal success (refresh studies after upload)
  const handleStudyUploaded = () => {
    toast.success("Study uploaded successfully!");
    fetchStudies();
    setIsModalOpen(false);
  };

  // ✅ Callback when a study is deleted successfully
  const handleDeleteSuccess = (deletedId) => {
    // Remove the study from the current list
    setStudies((prevStudies) => prevStudies.filter((s) => s._id !== deletedId));
    // Show a single success toast here
    toast.success("Study deleted successfully!");
  };

  return (
    <div className={`container ${styles.content}`}>
      <div className={styles.header}>
        <h1 className={styles.headerText}>My Studies</h1>
        <button
          className={styles.addStudy}
          onClick={() => setIsModalOpen(true)}
        >
          Add Study
        </button>
      </div>

      {error && <p className={styles.errorMessage}>⚠️ {error}</p>}

      {loading
        ? [...Array(3)].map((_, index) => <SkeletonCard key={index} />)
        : studies.map((study) => (
            <StudyCard
              key={study._id}
              study={study}
              // Pass our delete success callback
              onDeleteSuccess={handleDeleteSuccess}
            />
          ))}

      {/* Add Study Modal */}
      <AddStudy
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadSuccess={handleStudyUploaded}
      />
    </div>
  );
};

export default Dashboard;
