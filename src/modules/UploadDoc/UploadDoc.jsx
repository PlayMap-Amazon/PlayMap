import React, { useRef, useState } from "react";
import styles from "./UploadDoc.module.css";
import { AiOutlineLoading } from "react-icons/ai";
import { FaUpload } from "react-icons/fa6";

const UploadDoc = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;

    if (file.size <= 10 * 1024 * 1024) {
      setLoading(true);
      
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });

        const result = await response.json();
        console.log('Upload result:', result);
        
        if (response.ok) {
          alert(`File "${result.filename}" uploaded and processed! Content length: ${result.content_length} characters`);
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to upload file. Please check if the server is running.');
      } finally {
        setLoading(false);
      }
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

  return (
    <div style={{height:"100%", width: "100%"}} >
        <h1 style={{ textAlign: "center" }}>Document Summarizer</h1>
        <p style={{ textAlign: "center" }}>
            Extract key information and insights from your documents.
        </p>

        <div
            className={styles["upload-box"]}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            {loading ? (
                <div>
                    <AiOutlineLoading className={styles.SpinningLoad} style={{width: "40px", height: "40px", marginBottom: "10px"}}/>
                    <p>Processing your file...</p>
                </div>
            ) : (
                <div>
                    <FaUpload style={{width: "40px", height: "40px", marginBottom: "10px"}}/>
                    <p>Drag a file here or click to upload</p>
                </div>
            )}
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
    </div>
  );
};

export default UploadDoc;
