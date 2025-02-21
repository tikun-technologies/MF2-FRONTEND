import React from "react";
import { FaFilePdf, FaRegFilePowerpoint } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PptxGenJS from "pptxgenjs";
import "./ExportButton.css";

export const ExportPage = () => {
  // Function to Export Page as PDF
  const exportToPDF = () => {
    const element = document.getElementById("page-content");
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 size width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Page_Export.pdf");
    });
  };

  // Function to Export Page as PowerPoint
  const exportToPPTX = () => {
    let pptx = new PptxGenJS();
    let slide = pptx.addSlide();

    slide.addText("Page Export", { x: 1, y: 0.5, fontSize: 24, bold: true });

    const element = document.getElementById("page-content");
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      slide.addImage({ data: imgData, x: 0, y: 1, w: 10 });
      pptx.writeFile({ fileName: "Page_Export.pptx" });
    });
  };

  return (
    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
      <button onClick={exportToPDF}>
        <FaFilePdf size={20} color="red" /> Export PDF
      </button>
      <button onClick={exportToPPTX}>
        <FaRegFilePowerpoint size={20} color="orange" /> Export PPTX
      </button>
    </div>
  );
};

// Button Styling
const buttonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "10px 15px",
  fontSize: "16px",
  border: "none",
  cursor: "pointer",
  background: "#f4f4f4",
  borderRadius: "5px",
  transition: "0.3s",
  color: "blue",
};

export default ExportPage;
