import React, { useState, useEffect, useContext } from "react";
import { FaFilePdf, FaRegFilePowerpoint } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PptxGenJS from "pptxgenjs";
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

  useEffect(() => {
    setActualCanExportPpt(initialHasPpt);
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

  const performActualPptExport = () => {
    setIsExportingPPTX(true);
    let pptx = new PptxGenJS();
    let slide = pptx.addSlide();

    slide.addText("Page Export", { x: 1, y: 0.5, fontSize: 24, bold: true });

    const element = document.getElementById("page-content");
    if (!element) {
      console.error("Element with ID 'page-content' not found for PPT export.");
      setIsExportingPPTX(false);
      return;
    }

    html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      // Adjust w and h for desired image size/aspect ratio in PPT
      slide.addImage({ data: imgData, x: 0, y: 1, w: 10, h: 5.625 });

      pptx.writeFile({ fileName: "Page_Export.pptx" }).then(() => {
        setIsExportingPPTX(false);
      }).catch(err => {
        console.error("Error writing PPTX file:", err);
        setIsExportingPPTX(false);
      });
    }).catch(err => {
      console.error("Error during html2canvas for PPTX:", err);
      setIsExportingPPTX(false);
    });
  };

  const handlePptExportOrCheck = async () => {
    if (isExportingPPTX || isCheckingPptStatus || pptCooldown > 0) {
      return;
    }

    if (actualCanExportPpt) {
      performActualPptExport();
    } else {
      setIsCheckingPptStatus(true);
      if (!token) {
        console.warn("No authentication token found. Cannot check PPT status.");
        setPptCooldown(50); // Start cooldown as we can't proceed
        setIsCheckingPptStatus(false);
        return;
      }

      try {
        const study = await getStudy(id, token); // Use the actual getStudy function
        console.log("Fetched study for PPT check:", study); // Optional: log fetched study
        if (study && study.hasPpt) {
          setActualCanExportPpt(true);
          // Automatically attempt export now that permission is granted
          performActualPptExport();
        } else {
          setActualCanExportPpt(false); // Explicitly set to false
          setPptCooldown(50);
        }
      } catch (error) {
        console.error("Error fetching study for PPT check:", error);
        setActualCanExportPpt(false); // Ensure it's false on error
        setPptCooldown(50); // Start cooldown on error
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
    pptButtonText = `Try again in ${pptCooldown}s`;
  }

  return (
    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
      <button onClick={exportToPDF} disabled={isExportingPDF} style={{ opacity: isExportingPDF ? 0.7 : 1 }}>
        <FaFilePdf size={20} color="red" /> {isExportingPDF ? "Exporting..." : "Export PDF"}
      </button>
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
