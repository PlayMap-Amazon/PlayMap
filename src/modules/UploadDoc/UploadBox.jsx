import React, { useRef } from "react";
import styles from "./UploadDoc.module.css";

const UploadBox = ({ accept, label, onFileSelect }) => {
  const fileInputRef = useRef();

  const handleClick = () => fileInputRef.current.click();
  const handleChange = (e) => onFileSelect(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    onFileSelect(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      className={styles["upload-box"]}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <img src="https://img.icons8.com/ios/50/upload.png" alt="Upload Icon" />
      <p>{label}</p>
      <input type="file" accept={accept} ref={fileInputRef} hidden onChange={handleChange} />
      <small>Max: 10MB</small>
    </div>
  );
};

export default UploadBox;
