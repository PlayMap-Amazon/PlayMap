import styles from "./ProfilePage.module.css";
import CurrentStreak from "./CurrentStreak.jsx";
import LeaderBoard from "./LeaderBoard";
import LevelSection from "./LevelSection";
import ProfileInfo from "./ProfileInfo";
import StudyTimeSection from "./StudyTimeSection";
import StreakCalendar from "./StreakCalendar.jsx";
import { useState } from "react";
import ExamCalendar from "./ExamCalendar.jsx";
import TaskTracker from "./TaskTracker.jsx";
import StudyBuddy from "./StudyBuddy.jsx";
import AchievementsSection from "./AchievementsSection.jsx";
import AchievementsModal from "./AchievementsModal.jsx";
import Top3Section from "./Top3Section.jsx";
import ChatBotButton from "../ChatBot/ChatBotButton.jsx";
import Portal from "./Portal.jsx";
import { useAuth } from "../AuthContext"; 
import FloatingParticles from "@/FloatingParticles";
import Navbar from "@/Navbar/Navbar";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  if (loading) return <div className={styles.body}>Loading...</div>;
  if (!user) return <div className={styles.body}>No user logged in</div>;

  const safeUser = {
    username: user.username ?? user.name ?? "Unknown",
    experience: user.experience ?? user.exp ?? 0,
    level: user.level ?? 0,
    streak: user.streak ?? 0,
    institution: user.institution ?? null,
    studySessions: Array.isArray(user.studySessions) ? user.studySessions : [],
    friends: Array.isArray(user.friends) ? user.friends : [],
    topMindMaps: Array.isArray(user.topMindMaps) ? user.topMindMaps : [],
    topMinigameTopics: Array.isArray(user.topMinigameTopics)
      ? user.topMinigameTopics
      : [],
    achievements: Array.isArray(user.achievements) ? user.achievements : [],
    img: user.img ?? user.avatarUrl ?? null,
  };

  const leaderboardUsers = [
    { ...safeUser, avatarUrl: safeUser.img ?? "profile_picture.png" },
    ...safeUser.friends.map((f) => ({
      username: f.username ?? f.name ?? "Friend",
      level: f.level ?? 0,
      experience: f.experience ?? 0,
      avatarUrl: f.avatarUrl ?? f.img ?? "profile_picture_2.png",
    })),
  ];

  leaderboardUsers.sort((a, b) => {
    if (b.level === a.level) {
      return (b.experience ?? 0) - (a.experience ?? 0);
    }
    return (b.level ?? 0) - (a.level ?? 0);
  });

  function getRequiredExp(level) {
    return Math.floor(100 * Math.pow(1.2, Math.max(1, level - 1)));
  }

  const nextLevelExp = getRequiredExp(safeUser.level + 1);

  return (
    <div className={styles.body}>
      <Navbar />
      <FloatingParticles />
      <ChatBotButton />
      <div className={styles.profilePage}>
        <div className={styles.profileContainer}>
          <div className={styles.profileInfo}>
            <ProfileInfo user={safeUser} />
          </div>
          <div className={styles.iconsContainer}>
            <CurrentStreak
              streak={safeUser.streak}
              studyDates={safeUser.studySessions.map((s) => s.date)}
            />
            <LevelSection
              level={safeUser.level}
              currentExp={safeUser.experience}
              nextLevelExp={nextLevelExp}
            />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <StreakCalendar studyDates={safeUser.studySessions.map((s) => s.date)} />
        <div className={styles.section}>
          <StudyTimeSection user={safeUser} />
          <button className={styles.button} onClick={() => setShowLeaderboard(true)}>
            Show Leaderboard
          </button>

          {showLeaderboard && (
            <Portal>
              <div className={styles.modalOverlay} onClick={() => setShowLeaderboard(false)}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                  <LeaderBoard friends={leaderboardUsers} onClose={() => setShowLeaderboard(false)} />
                </div>
              </div>
            </Portal>
          )}
        </div>

        <div className={styles.section}>
          <AchievementsSection />
          <button className={styles.button} onClick={() => setShowAchievements(true)}>
            Show All
          </button>

          {showAchievements && (
            <div className={styles.modalOverlay} onClick={() => setShowAchievements(false)}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <AchievementsModal achievements={safeUser.achievements} onClose={() => setShowAchievements(false)} />
              </div>
            </div>
          )}
        </div>

        <StudyBuddy />
      </div>

      <div className={styles.row}>
        <TaskTracker />
        <ExamCalendar />
      </div>

      <div className={styles.row}>
        <Top3Section user={safeUser} />
      </div>
    </div>
  );
}
