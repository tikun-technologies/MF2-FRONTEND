import React, { useEffect, useRef } from "react";
import styles from "./OptionsModal.module.css";

const OptionsModal = ({ isOpen, onClose, options, buttonRef }) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer} ref={modalRef}>
      {options.map((option, index) => (
        <button
          key={index}
          className={styles.modalOption}
          onClick={option.onClick}
        >
          {option.icon && <span className={styles.icon}>{option.icon}</span>}
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default OptionsModal;
