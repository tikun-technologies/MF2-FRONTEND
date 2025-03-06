import React, { useState } from "react";
import { FaFilePdf, FaRegFilePowerpoint } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PptxGenJS from "pptxgenjs";
import "./ExportButton.css";

export const ExportPage = () => {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingPPTX, setIsExportingPPTX] = useState(false);

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
      const imgWidth = 230;
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

  // Function to Export Page as PowerPoint
  const exportToPPTX = () => {
    setIsExportingPPTX(true); // Start PPTX loading state
    let pptx = new PptxGenJS();
    let slide = pptx.addSlide();

    slide.addText("Page Export", { x: 1, y: 0.5, fontSize: 24, bold: true });

    const element = document.getElementById("page-content");
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      slide.addImage({ data: imgData, x: 0, y: 1, w: 10 });

      pptx.writeFile({ fileName: "Page_Export.pptx" }).then(() => {
        setIsExportingPPTX(false); // Stop PPTX loading state
      });
    });
  };

  return (
    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
      <button onClick={exportToPDF} disabled={isExportingPDF} style={{ opacity: isExportingPDF ? 0.7 : 1 }}>
        <FaFilePdf size={20} color="red" /> {isExportingPDF ? "Exporting..." : "Export PDF"}
      </button>
      <button onClick={exportToPPTX} disabled={isExportingPPTX} style={{ opacity: isExportingPPTX ? 0.7 : 1 }}>
        <FaRegFilePowerpoint size={20} color="orange" /> {isExportingPPTX ? "Exporting..." : "Export PPTX"}
      </button>
    </div>
  );
};

export default ExportPage;
