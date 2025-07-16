import React, { useRef, useState } from "react";
import styles from "./UploadDoc.module.css";

const UploadDoc = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Handle and process the file
  const handleFile = (file) => {
    if (!file) return;

    if (file.size <= 10 * 1024 * 1024) {
      setLoading(true);
        
      // Simulate loading
      setTimeout(() => {
        setLoading(false);
        alert(`File "${file.name}" uploaded and processed!`);
      }, 2000);
    } else {
      alert("File too large or invalid type.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleRestart = () => {
    fileInputRef.current.value = null;
    alert("Restarted");
  };

  return (
    <div className={styles.container}>
        <aside className={styles.sidebar}>
            <div className={styles["logo-box"]}>
                <img src="logo.png" className={styles.logo} alt="PlayMap logo" />
            </div>
            <h1 className={styles["brand-name"]}>PlayMap</h1>

            <nav>
                <ul className={styles.menu}>
                    <li>
                    <i data-lucide="message-square"></i> New Topic
                    </li>
                </ul>

                <p className={styles["section-title"]}>Summarize PDF/Doc</p>
                <ul className={styles.menu}>
                    <li className={styles.active}>
                        <i data-lucide="file-text"></i> PDF
                    </li>
                    <li>
                        <i data-lucide="file"></i> Document
                    </li>
                    <li>
                        <i data-lucide="image"></i> Images
                    </li>
                    <li>
                        <i data-lucide="file-ppt"></i> Slides
                    </li>
                </ul>

                <p className={styles["section-title"]}>History</p>
                <ul className={styles.menu}>
                    <li>
                        <i data-lucide="flame"></i> Volcanos
                    </li>
                    <li>
                        <i data-lucide="atom"></i> Periodic Table
                    </li>
                </ul>
            </nav>
        </aside>

        <main className={styles["main-content"]}>
            <h1 style={{ textAlign: "center" }}>PDF Summarizer</h1>
            <p style={{ textAlign: "center" }}>
                Extract key information and insights from lengthy PDFs.
            </p>

            <div
            className={styles["upload-box"]}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            >
                <img
                    src="https://img.icons8.com/ios/50/upload.png"
                    alt="Upload Icon"
                />
                <p>Drag a file here or click to upload</p>
                <small>
                    Accepted: PDF, Word, Markdown, Text | Max: 10MB
                </small>
                <input
                    type="file"
                    accept=".pdf,.docx,.md,.txt"
                    ref={fileInputRef}
                    onChange={handleChange}
                    hidden
                />
            </div>
            <div>Click or drop your file here</div>
            <button
                className={styles.restartBtn}
                onClick={handleRestart}
            >
                Restart
            </button>

            {loading && (
                <div className={styles.loader}>
                    <img
                    src="loading.gif"
                    alt="Loading..."
                    className={styles["loading-gif"]}
                    />
                    <p>Processing your file...</p>
                </div>
            )}
        </main>
    </div>
  );
};

export default UploadDoc;
