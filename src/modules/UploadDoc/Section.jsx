import React from "react";
import styles from "./UploadDoc.module.css";

const Section = ({ title, description, children }) => (
  <div className={styles.section}>
    <h1>{title}</h1>
    <p>{description}</p>
    {children}
  </div>
);

export default Section;
