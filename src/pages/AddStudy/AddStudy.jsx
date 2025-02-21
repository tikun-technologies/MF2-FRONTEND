import React, { useState,useRef } from "react";
import { Upload, AlertCircle, Check, Loader } from "lucide-react";
import axios from "axios";
import "./AddStudy.css"; // Import the CSS file
import {useNavigate} from "react-router-dom";

export function AddDataForm() {
    const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  const handleAddMore = () => {
    // setIsSuccess(false);
    setMessage(null);
    setFormData({
      postType: "Carousel",
      likes: "",
      shares: "",
      comments: "",
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clears selected file
    }
  };
  const [formData, setFormData] = useState({
    postType: "Carousel",
    likes: "",
    shares: "",
    comments: "",
  });

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Single Data Submission
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/add_single", {
        post_type: formData.postType,
        likes: formData.likes,
        shares: formData.shares,
        comments: formData.comments,
      });

      if (response.status === 200) {
        setMessage({ type: "success", text: "Data added successfully!" });
        setFormData({
          postType: "Carousel",
          likes: "",
          shares: "",
          comments: "",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to add data!" });
    }
    setIsLoading(false);
  };

  // Handle File Upload (CSV)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const response = await axios.post(
        "http://studies.centralus.cloudapp.azure.com:5000/add/study",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage({
          type: "success",
          text: "CSV file processed successfully!",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error uploading CSV file." });
    }
    setIsLoading(false);
  };

  return (
    <div className="AddStudy-container">
      <div className="addstudy-form-card">
        <h2>Upload CSV</h2>
        <div className="addstudy-upload-box">
          <Upload className="upload-icon" />
          <p>Upload a CSV </p>
          <input type="file" onChange={handleFileUpload} ref={fileInputRef} />
        </div>
      </div>

      {message && (
        <div
          className={`message ${message.type === "success" ? "success" : "error"}`}
        >
          {message.type === "success" ? (
            <Check className="addstudy-icon" />
          ) : (
            <AlertCircle className="icon" />
          )}
          <p>{message.text}</p>

          <div className="addstudy-success-card">
            <Check className="addstudy-icon-large" />
            <h3>Data Added Successfully!</h3>
            <div className="addstudy-btn-group">
              <button className="addstudy-btn btn-primary" onClick={handleAddMore}>
                Add More
              </button>
              <button
                className="addstudy-btn btn-secondary"
                onClick={handleGoToDashboard}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="addstudy-loading">
          <Loader className="addstudy-spinner" />
          <p>Processing...</p>
        </div>
      )}
    </div>
  );
}

export default AddDataForm;
