import React, { useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./AddStudy.module.css";
import { uploadStudy } from "../api/uploadStudy";
import AuthContext from "../../../context/AuthContext";

const AddStudy = ({ isOpen, onClose, onUploadSuccess }) => {
  const { token } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error("Only .xlsx files are allowed.");
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an .xlsx file first!");
      return;
    }

    setUploading(true);

    try {
      await uploadStudy(selectedFile, token);
      onUploadSuccess();
      setTimeout(handleClose, 1000);
    } catch (error) {
      toast.error(`Upload failed: ${error.message}`);
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: false,
  });

  return isOpen ? (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <ToastContainer position="top-right" autoClose={3000} />

        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <h2 className={styles.title}>Upload Study</h2>

        <div {...getRootProps()} className={styles.dropZone}>
          <input {...getInputProps()} />
          <div className={styles.uploadIcon}>⬆️</div>
          {isDragActive ? (
            <p>Drop the file here...</p>
          ) : selectedFile ? (
            <p>{selectedFile.name}</p>
          ) : (
            <p>Drag & drop an Excel file here, or click to select a file</p>
          )}
        </div>

        <button
          className={styles.processButton}
          disabled={!selectedFile || uploading}
          onClick={handleUpload}
        >
          {uploading ? `Uploading...` : "Upload Study"}
        </button>
      </div>
    </div>
  ) : null;
};

export default AddStudy;
