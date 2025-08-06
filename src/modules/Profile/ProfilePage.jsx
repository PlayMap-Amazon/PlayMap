import styles from "./ProfilePage.module.css";
import common_styles from "../../App.module.css";
import TopBar from "../Topbar/Topbar";
import { Link } from 'react-router-dom';
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

export default function ProfilePage() {

    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [showAchievements, setShowAchievements] = useState(false);


    const user = {
        username: "Emma Smith",
        experience: 320,
        level: 8,
        streak: 3,
        institution: "Massachusetts Institute of Technology",
        studySessions: [
            { date: "2025-07-17", hours: 1 },
            { date: "2025-07-18", hours: 2 },
            { date: "2025-07-22", hours: 1.5 },
            { date: "2025-07-23", hours: 3 },
            { date: "2025-07-24", hours: 2.5 },
        ],
        friends: [
            {
            username: "Alex",
            level: 5,
            experience: 280,
            avatarUrl: "profile_picture_2.png",
            },
            {
            username: "Luna",
            level: 6,
            experience: 320,
            avatarUrl: "profile_picture_3.png",
            },
        ],
        topMindMaps: [
            { title: "Data Structures", count: 5 },
            { title: "Networking Fundamentals", count: 4 },
            { title: "Object-Oriented Programming (OOP)", count: 3 },
            { title: "English Vocabulary", count: 2 },
        ],
        topMinigameTopics: [
            { topic: "Math Basics", count: 10 },
            { topic: "English Vocabulary", count: 8 },
            { topic: "Sorting Algorithms", count: 6 },
            { topic: "Data Structures", count: 4 },
        ],
        achievements: [
            {
                title: "Consistency is Key",
                description: "Studied 5 days in a row.",
                exp: 60,
                unlocked: true,
                image: "/images/achievements/consistency.png",
                category: "Study",
            },
            {
                title: "Minigame Explorer",
                description: "Played all minigames at least once.",
                exp: 80,
                unlocked: true,
                image: "/images/achievements/explorer.png",
                category: "Games",
            },
            {
                title: "Perfect Score",
                description: "Completed a minigame with 100% accuracy.",
                exp: 90,
                unlocked: false,
                image: "/images/achievements/perfect.png",
                category: "Games",
            },
            {
                title: "Practice Makes Perfect",
                description: "Played the same minigame 10 times.",
                exp: 60,
                unlocked: true,
                image: "/images/achievements/practice.png",
                category: "Games",
            },
            {
                title: "Achievement Hunter",
                description: "Unlocked 10 achievements.",
                exp: 100,
                unlocked: true,
                image: "/images/achievements/hunter.png",
                category: "Meta",
            }
        ]
    };

    const leaderboardUsers = [
    {
      ...user,
      avatarUrl: "profile_picture.png",
    },
    ...user.friends,
  ];

  leaderboardUsers.sort((a, b) => {
    if (b.level === a.level) {
      return b.experience - a.experience;
    }
    return b.level - a.level;
  });

    function getRequiredExp(level) {
        return Math.floor(100 * Math.pow(1.2, level - 1));
    }

    const nextLevelExp = getRequiredExp(user.level + 1);

    return (
        <div className={styles.body}>
            <TopBar>
                <Link to="/">
                <button
                    className={common_styles.customButton}
                    style={{
                    color: '#C06D3E',
                    backgroundColor: '#F5E9E3',
                    borderColor: '#FB7E25',
                    }}
                >
                    Home
                </button>
                </Link>
            </TopBar>
            <div className={styles.profilePage}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileInfo}>
                        <ProfileInfo user = {user}/>
                    </div>
                    <div className={styles.iconsContainer}>
                        <CurrentStreak 
                            streak={user.streak}
                            studyDates={user.studySessions.map(session => session.date)}
                        />
                        <LevelSection 
                            level={user.level}
                            currentExp={user.experience}
                            nextLevelExp={nextLevelExp}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.row}>
                <StreakCalendar
                    studyDates={user.studySessions.map(session => session.date)}
                />
                <div className={styles.section}>
                    <StudyTimeSection user={user}/>
                    <button className={styles.button} onClick={() => setShowLeaderboard(true)}>
                        Show Leaderboard
                    </button>
                    {showLeaderboard && (
                    <div className={styles.modalOverlay} onClick={() => setShowLeaderboard(false)}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeButton} onClick={() => setShowLeaderboard(false)}>✕</button>
                            <LeaderBoard friends={leaderboardUsers} />
                        </div>
                    </div>
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
                            <button className={styles.closeButton} onClick={() => setShowAchievements(false)}>✕</button>
                            <AchievementsModal achievements={user.achievements}/>
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
                <Top3Section user={user} />
            </div>
        </div>
    );
}
