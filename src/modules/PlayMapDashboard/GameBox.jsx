import React from "react";
import styles from "./PlayMapDashboard.module.css";
import Sparkle from "./Sparkle";

export default function GameBox({ icon, title, description, onPlay }) {
  return (
    <div className={styles.gameBox} onClick={onPlay}>
      <Sparkle />
      <div className={styles.gameIcon}>{icon}</div>
      <h2 className={styles.gameTitle}>{title}</h2>
      <p className={styles.gameDescription}>{description}</p>
      <button className={styles.playButton} onClick={onPlay}>
        Play Now
      </button>
    </div>
  );
}
