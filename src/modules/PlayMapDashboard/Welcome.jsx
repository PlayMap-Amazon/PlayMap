import React from "react";
import styles from "./PlayMapDashboard.module.css";

export default function Welcome({ username = "John" }) {
  return (
    <div className={styles.welcomeSection}>
      <h1 className={styles.welcomeText}>
  Welcome back, <span className={styles.orangeHighlight}>{username}</span>!
</h1>

    </div>
  );
}
