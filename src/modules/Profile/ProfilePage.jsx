import styles from "./ProfilePage.module.css";
import common_styles from "../../App.module.css";
import TopBar from "../Topbar/Topbar";
import { Link } from 'react-router-dom';
import StreakSection from "./StreakSection";
import LeaderBoard from "./LeaderBoard";
import LevelSection from "./LevelSection";
import ProfileInfo from "./ProfileInfo";
import StudyTimeSection from "./StudyTimeSection";

export default function ProfilePage() {

    const user = {
        username: "Emma Smith",
        experience: 320,
        level: 11,
        streak: 3,
        institution: "University of Example",
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
                </div>
                
            </div>

            <div className={styles.row}>
                <StreakSection 
                    streak={user.streak}
                    studyDates={user.studySessions.map(session => session.date)}
                />
                <StudyTimeSection user={user}/>

                <LevelSection 
                    level={user.level}
                    currentExp={user.experience}
                    nextLevelExp={nextLevelExp}
                />
            </div>
            <LeaderBoard friends={leaderboardUsers}/> 
        </div>
    );
}
