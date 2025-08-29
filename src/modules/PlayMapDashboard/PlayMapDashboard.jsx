import React, { useState } from "react";
import styles from "./PlayMapDashboard.module.css";
import FloatingParticles from "./FloatingParticles";
import GameBox from "./GameBox";
import Notification from "./Notification";
import Navbar from "../Navbar/Navbar";

export default function PlayMapDashboard() {
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className={styles.page}>
      <FloatingParticles />

      {/* Navbar */}
      <Navbar />

      {/* Welcome */}
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>
          Welcome back, <span className={styles.username}>John</span>!
        </h1>
      </div>

      {/* Game Sections */}
      <div className={styles.gameSections}>
        <GameBox
          icon="🎯"
          title="Trivia Quizzes"
          description="Test your knowledge with exciting trivia questions from your study materials. Challenge yourself and track your progress!"
          onPlay={() => showNotification("🎯 Starting Trivia Quiz! Get ready to test your knowledge!")}
        />
        <GameBox
          icon="🔤"
          title="Word Scrambles"
          description="Unscramble letters to form key terms and concepts. Improve your vocabulary while having fun!"
          onPlay={() => showNotification("🔤 Word Scramble loading... Unscramble to win!")}
        />
        <GameBox
          icon="🔗"
          title="Matching Pairs"
          description="Match related concepts, definitions, and terms. Perfect for memorizing important connections!"
          onPlay={() => showNotification("🔗 Matching Pairs game starting... Find the connections!")}
        />
      </div>

      {notification && <Notification message={notification} />}
    </div>
  );
}
