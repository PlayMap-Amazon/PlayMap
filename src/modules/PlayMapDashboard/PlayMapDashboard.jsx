import React, { useState } from "react";
import styles from "./PlayMapDashboard.module.css";
import FloatingParticles from "./FloatingParticles";
import GameBox from "./GameBox";
import Notification from "./Notification";
import ChatBotButton from "../ChatBot/ChatBotButton";
import { useAuth } from "../../AuthContext";

export default function PlayMapDashboard() {
  const [notification, setNotification] = useState(null);
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  const { user, loading } = useAuth?.() ?? { user: null, loading: false };
  const rawName = user?.firstName?.trim() || user?.username || 'there';
  const displayName = rawName
    ? rawName.charAt(0).toUpperCase() + rawName.slice(1)
    : 'There';

  if (loading) {
    return (
      <div className={styles.page}>
        <p>Loading Profile…</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      
      <FloatingParticles />
      <ChatBotButton />

      {/* Welcome */}
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>
          Welcome back, <span className={styles.username}>{displayName}</span>!
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
