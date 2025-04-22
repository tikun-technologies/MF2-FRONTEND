import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./StudyCard.module.css";
import Badge from "../Badges/Badge";
import { PiDotsThreeVertical } from "react-icons/pi";
import { FiTrash2, FiEdit } from "react-icons/fi";
import OptionsModal from "../common/Modals/OptionsModal";
import ConfirmationModal from "../common/Modals/ConfirmationModal";
import AuthContext from "../../context/AuthContext";
import { deleteStudy } from "../../features/studies/api/deleteStudy";

const NavigationPopup = ({ _id, onClose }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/study/${_id}`);
    onClose();
  };

  const handlePlaygroundClick = () => {
    navigate(`/playground/${_id}`);
    onClose();
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.navPopup}>
        <h3>Where would you like to go?</h3>
        <div className={styles.navButtons}>
          <button 
            className={styles.navButton}
            onClick={handleDetailsClick}
          >
            Study Details
          </button>
          <button 
            className={styles.navButton}
            onClick={handlePlaygroundClick}
          >
            Playground
          </button>
        </div>
      </div>
    </div>
  );
};

const StudyCard = ({ study, onDeleteSuccess, onEdit }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { studyKeywords, studyStarted, studyStatus, studyTitle, _id } = study;

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [showNavPopup, setShowNavPopup] = useState(false);

  const optionsButtonRef = useRef(null);

  const handleCardClick = () => {
    if (!isOptionsOpen) {
      setShowNavPopup(true);
    }
  };

  const closeNavPopup = () => {
    setShowNavPopup(false);
  };

  const toggleOptions = (e) => {
    e.stopPropagation();
    setIsOptionsOpen((prev) => !prev);
  };

  const handleDeleteClick = () => {
    setIsOptionsOpen(false);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await deleteStudy(_id, token);
      onDeleteSuccess(_id);
    } catch (error) {
      toast.error("Failed to delete study. Please try again.");
      console.error("❌ Delete Error:", error.message);
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
    }
  };

  const options = [
    { label: "Delete", icon: <FiTrash2 />, onClick: handleDeleteClick },
  ];

  return (
    <div
      className={`global-border ${styles.studyContainer}`}
      style={{ position: "relative" }}
      onClick={handleCardClick}
    >
      <div className={styles.studiesHeader}>
        <h2 className={styles.studyTitle}>{studyTitle}</h2>
        <button
          ref={optionsButtonRef}
          className={styles.studyOptions}
          onClick={toggleOptions}
        >
          <PiDotsThreeVertical className={styles.studyOptionsIcon} />
        </button>
      </div>

      <div className={styles.studyMeta}>
        <div className={styles.studyStatus}>
          <Badge
            type={
              /^\d{2}\/\d{2}\/\d{4}$/.test(studyStatus)
                ? "completed"
                : studyStatus
            }
            badgeText={
              /^\d{2}\/\d{2}\/\d{4}$/.test(studyStatus)
                ? "completed"
                : studyStatus
            }
          />
          {studyStarted && <p>{`Created on: ${studyStarted}`}</p>}
        </div>
      </div>

      <div className={styles.studySeo}>
        <ul className={styles.studyTags}>
          {studyKeywords?.map((keyword, index) => (
            <Badge badgeText={keyword} type="tag" key={index} />
          ))}
        </ul>
      </div>

      {/* Navigation Popup */}
      {showNavPopup && (
        <NavigationPopup _id={_id} onClose={closeNavPopup} />
      )}

      {/* Options Modal */}
      {isOptionsOpen && (
        <div
          className={styles.studyOptionsModal}
          onClick={(e) => e.stopPropagation()}
        >
          <OptionsModal
            isOpen={isOptionsOpen}
            onClose={() => setIsOptionsOpen(false)}
            options={options}
            buttonRef={optionsButtonRef}
          />
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div
          className={styles.studyOptionsModal}
          onClick={(e) => e.stopPropagation()}
        >
          <ConfirmationModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Confirm Study Deletion"
            message="Are you sure you want to delete this study? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
          />
        </div>
      )}
    </div>
  );
};

export default StudyCard;