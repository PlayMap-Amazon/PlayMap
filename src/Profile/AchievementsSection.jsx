import styles from "./AchievementsSection.module.css";

export default function AchievementsSection() {
    return (
        <div className={styles.achievementsSectionWrapper}>
            <div className={styles.title}>Achievements</div>
            <img  class ={styles.badgeImg} src="badge.png" alt="Achievements Icon" className={styles.icon} />
            <div className={styles.badgeInfo}>
                <p className={styles.badgeTitle}>Minigame Explorer</p>
                <p className={styles.badgeDescription}>Awarded for completing all minigames at least once</p>
            </div>
        </div>
    );
}