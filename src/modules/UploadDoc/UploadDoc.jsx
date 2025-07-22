import React, { useEffect, useState } from "react";
import styles from "./UploadDoc.module.css";
import UploadBox from "./UploadBox";
import Sidebar from "./Sidebar";
import Section from "./Section";
import HistoryList from "./HistoryList";
import { initIcons } from "../../icons";


const UploadDoc = () => {
  const [activeSection, setActiveSection] = useState("new");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleFile = (file) => {
    if (!file) return;

    if (file.size <= 10 * 1024 * 1024) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        alert(`File "${file.name}" uploaded and processed!`);
        setHistory((prev) => [...prev, file.name]);
      }, 2000);
    } else {
      alert("File too large or invalid type.");
    }
  };

  useEffect(() => {
    initIcons();
  }, [activeSection]);

  return (
    <div className={styles.container}>
      <Sidebar active={activeSection} setActive={setActiveSection} history={history} />
      <main className={styles["main-content"]}>
        <div className={styles["top-bar"]}>
          <h1 className={styles["brand-name"]}>PlayMap</h1>
        </div>

        <div className={styles["summarizer-wrapper"]}>
          {activeSection === "new" && (
            <Section title="Summarizer" description="Pick a topic you want to learn.">
              <div className={styles["search-bar"]}>
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Enter a topic name..."
                  className={styles["search-input"]}
                />
                <i data-lucide="send" className={styles["send-icon"]}></i>
              </div>
            </Section>
          )}

          {activeSection === "pdf" && (
            <Section title="PDF Summarizer" description="Extract key information and insights from lengthy PDFs.">
              <UploadBox
                accept=".pdf"
                label="Drag a PDF here or click to upload"
                onFileSelect={handleFile}
              />
            </Section>
          )}

          {activeSection === "document" && (
            <Section title="Document Summarizer" description="Upload Word or text files for quick summarization.">
              <UploadBox
                accept=".docx,.txt,.md"
                label="Drag a DOC or TXT here or click to upload"
                onFileSelect={handleFile}
              />
            </Section>
          )}

          {activeSection === "images" && (
            <Section title="Image Summarizer" description="Upload screenshots or photos to extract key data.">
              <UploadBox
                accept="image/*"
                label="Drag an image here or click to upload"
                onFileSelect={handleFile}
              />
            </Section>
          )}

          {activeSection === "slides" && (
            <Section title="Slides Summarizer" description="Upload presentations for fast summarization.">
              <UploadBox
                accept=".ppt,.pptx"
                label="Drag a PPT or PDF slide here or click to upload"
                onFileSelect={handleFile}
              />
            </Section>
          )}
        </div>

        {loading && (
          <div className={styles.loader}>
            <div className={styles["loader-animation"]}></div>
            <p>Processing your file...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default UploadDoc;
