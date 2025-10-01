import React from "react";
import { motion } from "framer-motion";
import styles from "../PlayMapDashboard.module.css";
import Sparkle from "./Sparkle";

export default function GameBox({ icon, title, description, onPlay, index = 0 }) {
  const floatVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
      rotateX: -15,
      transition: {
        type: "spring",
        duration: 0.4,
        delay: index * 0.05
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.4,
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div 
      className={styles.gameBox} 
      onClick={onPlay}
      variants={floatVariants}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
    >
      <Sparkle />
      <div className={styles.gameIcon}>{icon}</div>
      <h2 className={styles.gameTitle}>{title}</h2>
      <p className={styles.gameDescription}>{description}</p>
      <button className={styles.playButton} onClick={onPlay}>
        Play Now
      </button>
    </motion.div>
  );
}
