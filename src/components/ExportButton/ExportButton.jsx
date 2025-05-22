import React, { useState, useEffect, useContext } from "react";
import { FaFilePdf, FaRegFilePowerpoint } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// PptxGenJS import removed as it's no longer used for PPT export when pptUrl is present
import "./ExportButton.css";
import AuthContext from "../../context/AuthContext";
import { getStudy } from '../../api/getStudies';

export const ExportPage = ({ hasPpt: initialHasPpt, id }) => {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingPPTX, setIsExportingPPTX] = useState(false);
  const { token } = useContext(AuthContext);

  const [actualCanExportPpt, setActualCanExportPpt] = useState(initialHasPpt);
  const [pptCooldown, setPptCooldown] = useState(0); // Cooldown in seconds
  const [isCheckingPptStatus, setIsCheckingPptStatus] = useState(false);
  const [currentPptUrl, setCurrentPptUrl] = useState(null);
  const [fetchedStudyDetails, setFetchedStudyDetails] = useState(null);

  useEffect(() => {
    setActualCanExportPpt(initialHasPpt);
    if (!initialHasPpt) {
      setCurrentPptUrl(null);
      setFetchedStudyDetails(null);
    }
    // If initialHasPpt is true, currentPptUrl might still be null.
    // The click handler will fetch the URL if needed.
  }, [initialHasPpt]);

  useEffect(() => {
    let timerId;
    if (pptCooldown > 0) {
      timerId = setInterval(() => {
        setPptCooldown((prevCooldown) => {
          if (prevCooldown <= 1) {
            clearInterval(timerId);
            return 0;
          }
          return prevCooldown - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [pptCooldown]);

  // Function to Export Page as PDF (Full Page Fix)
  const exportToPDF = () => {
    setIsExportingPDF(true); // Start PDF loading state
    const element = document.getElementById("page-content");
    if (!element) return;

    document.body.style.height = "auto";
    document.documentElement.style.height = "auto";

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("Page_Export.pdf");
      setIsExportingPDF(false); // Stop PDF loading state

      document.body.style.height = "";
      document.documentElement.style.height = "";
    });
  };

  const performPptDownload = (url, studyTitle) => {
    setIsExportingPPTX(true);
    try {
      const link = document.createElement('a');
      link.href = url;
      // Sanitize title for filename or use a default
      const fileNameBase = studyTitle ? studyTitle.replace(/[^a-z0-9_.-]+/gi, '_') : 'Study_Export';
      link.setAttribute('download', `${fileNameBase}.pptx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Add a small delay before setting exporting to false to allow download to initiate
      setTimeout(() => setIsExportingPPTX(false), 500);
    } catch (error) {
      console.error("Error triggering PPT download:", error);
      setIsExportingPPTX(false);
    }
  };

  const handlePptExportOrCheck = async () => {
    if (isExportingPPTX || isCheckingPptStatus || pptCooldown > 0) {
      return;
    }

    if (actualCanExportPpt && currentPptUrl) {
      performPptDownload(currentPptUrl, fetchedStudyDetails?.studyTitle);
    } else {
      setIsCheckingPptStatus(true);
      if (!token) {
        console.warn("No authentication token found. Cannot check PPT status.");
        setPptCooldown(50);
        setIsCheckingPptStatus(false);
        setCurrentPptUrl(null);
        setFetchedStudyDetails(null);
        return;
      }

      try {
        const study = await getStudy(id, token);
        console.log("Fetched study for PPT check:", study);
        if (study && study.hasPpt && study.pptUrl) {
          setActualCanExportPpt(true);
          setCurrentPptUrl(study.pptUrl);
          setFetchedStudyDetails(study);
          performPptDownload(study.pptUrl, study.studyTitle);
        } else {
          setActualCanExportPpt(false);
          setCurrentPptUrl(null);
          setFetchedStudyDetails(null);
          setPptCooldown(50);
        }
      } catch (error) {
        console.error("Error fetching study for PPT check:", error);
        setActualCanExportPpt(false);
        setCurrentPptUrl(null);
        setFetchedStudyDetails(null);
        setPptCooldown(50);
      } finally {
        setIsCheckingPptStatus(false);
      }
    }
  };

  let pptButtonText = "Export PPTX";
  if (isExportingPPTX) {
    pptButtonText = "Exporting...";
  } else if (isCheckingPptStatus) {
    pptButtonText = "Checking...";
  } else if (pptCooldown > 0) {
    pptButtonText = `Getting ready in ${pptCooldown}s`;
  }

  return (
    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
      {/* <button onClick={exportToPDF} disabled={isExportingPDF} style={{ opacity: isExportingPDF ? 0.7 : 1 }}>
        <FaFilePdf size={20} color="red" /> {isExportingPDF ? "Exporting..." : "Export PDF"}
      </button> */}
      <button
        onClick={handlePptExportOrCheck}
        disabled={isExportingPPTX || isCheckingPptStatus || pptCooldown > 0}
        style={{ opacity: (isExportingPPTX || isCheckingPptStatus || pptCooldown > 0) ? 0.7 : 1 }}
      >
        <FaRegFilePowerpoint size={20} color="orange" /> {pptButtonText}
      </button>
    </div>
  );
};

export default ExportPage;
