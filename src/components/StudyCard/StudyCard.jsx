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

const StudyCard = ({ study, onDeleteSuccess, onEdit }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { studyKeywords, studyStarted, studyStatus, studyTitle, _id } = study;

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const optionsButtonRef = useRef(null);

  /**
   * Clicking the card navigates to the study details page,
   * unless the Options menu is open.
   */
  const handleCardClick = () => {
    if (!isOptionsOpen) {
      navigate(`/playground/${_id}`);
    }
  };

  /**
   * Toggle the 3-dot OptionsModal, stopping click
   * so we don't navigate.
   */
  const toggleOptions = (e) => {
    e.stopPropagation();
    setIsOptionsOpen((prev) => !prev);
  };

  /**
   * User clicks "Delete" inside OptionsModal → show ConfirmationModal
   */
  const handleDeleteClick = () => {
    setIsOptionsOpen(false); // close the 3-dot menu
    setIsConfirmOpen(true); // open the ConfirmationModal
  };

  /**
   * User confirms deletion → call delete API
   */
  const handleConfirmDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await deleteStudy(_id, token);
      onDeleteSuccess(_id); // Parent removes the study & can show success toast
    } catch (error) {
      toast.error("Failed to delete study. Please try again.");
      console.error("❌ Delete Error:", error.message);
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false); // close the ConfirmationModal
    }
  };

  // 3-dot menu options
  const options = [
    // { label: "Edit", icon: <FiEdit />, onClick: () => onEdit && onEdit(_id) },
    { label: "Delete", icon: <FiTrash2 />, onClick: handleDeleteClick },
  ];

  return (
    <div
      className={`global-border ${styles.studyContainer}`}
      style={{ position: "relative" }}
      onClick={handleCardClick} // Entire card navigates
    >
      <div className={styles.studiesHeader}>
        <h2 className={styles.studyTitle}>{studyTitle}</h2>
        <button
          ref={optionsButtonRef}
          className={styles.studyOptions}
          onClick={toggleOptions} // Stop click from navigating
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

      {/* Options Modal */}
      {isOptionsOpen && (
        // 🟩 STOP PROPAGATION HERE to avoid card click
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
        // 🟩 STOP PROPAGATION HERE too
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
