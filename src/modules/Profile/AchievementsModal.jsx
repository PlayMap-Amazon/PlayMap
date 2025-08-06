import { useState } from "react";
import styles from "./AchievementsModal.module.css";

export default function AchievementsModal({ achievements = [] }) {
    const [activeTab, setActiveTab] = useState("all");

    const completed = achievements.filter(a => a.unlocked);
    const locked = achievements.filter(a => !a.unlocked);

    const totalExp = completed.reduce((sum, a) => sum + a.exp, 0);
    const completionPercent = achievements.length
        ? Math.round((completed.length / achievements.length) * 100)
        : 0;

    const getDisplayedAchievements = () => {
        if (activeTab === "completed") return completed;
        if (activeTab === "locked") return locked;
        return [...completed, ...locked]; 
    };

    return (
        <div className={styles.achievementsModalWrapper}>
            <aside className={styles.sidebar}>
                <h3>Progress</h3>
                <div className={styles.percentSection}>
                    <p className = {styles.percent}>{completionPercent}%</p>
                    <p> {completed.length} of {achievements.length} achievements completed</p>
                </div>
                <p><strong>{totalExp}</strong> XP earned</p>
                <p><strong>{achievements.length}</strong> total achievements</p>
            </aside>

            <section className={styles.mainContent}>
                <div className={styles.tabs}>
                    <button
                        className={activeTab === "all" ? styles.active : ""}
                        onClick={() => setActiveTab("all")}
                    >
                        All
                    </button>
                    <button
                        className={activeTab === "completed" ? styles.active : ""}
                        onClick={() => setActiveTab("completed")}
                    >
                        Completed
                    </button>
                    <button
                        className={activeTab === "locked" ? styles.active : ""}
                        onClick={() => setActiveTab("locked")}
                    >
                        Locked
                    </button>
                </div>

                <div className={styles.achievementTable}>
                    {getDisplayedAchievements().map((a, index) => (
                        <div
                            key={index}
                            className={`${styles.achievementRow} ${a.unlocked ? styles.unlocked : styles.locked}`}
                        >
                            <div className={styles.imageCell}>
                                <img src={a.image} alt={a.title} />
                            </div>
                            <div className={styles.infoCell}>
                                <div className={styles.title}>{a.title}</div>
                                <div className={styles.description}>{a.description}</div>
                            </div>
                            <div className={styles.expCell}>{a.exp} XP</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
