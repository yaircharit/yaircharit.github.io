import React, { useEffect } from "react";
import "../styles/Resume.css";

const embeddedUrl = "https://drive.google.com/file/d/1fb-jceiKLVp3coIaTWFND2NKcd0GC2_5/preview"; // Place your PDF in the public folder
const pdfUrl = "https://docs.google.com/document/d/1fb-jceiKLVp3coIaTWFND2NKcd0GC2_5/export?format=pdf"; // Place your PDF in the public folder

export default function Resume() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="resume-container">
      <a href={pdfUrl} download className="resume-download-btn">
        ⬇ Download PDF
      </a>
      <iframe
        src={embeddedUrl}
        title="Resume"
        className="resume-iframe"
      />
      <a href={pdfUrl} download className="resume-download-btn">
        ⬇ Download PDF
      </a>
    </div>
  );
}