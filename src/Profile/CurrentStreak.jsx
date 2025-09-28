import styles from "./CurrentStreak.module.css";

export default function CurrentStreak({studyDates, streak}) {

    const getFlameIcon = () => {
        if (streak === 0) return "streak1.png";
        if (streak <= 3) return "streak2.png";
        if (streak <= 7) return "streak3.png";
        if (streak <= 14) return "streak4.png";
        return "streak4.png";
    };

    return(
        <div className={styles.streakContainer}>
            <h3 className={styles.streakLabel}>Current Streak</h3>
            <div className={styles.flameWrapper}>
                <img className={styles.flameIcon} src={getFlameIcon()} alt="Flame Icon" />
                <span className={styles.streakValue}>{streak}</span>
            </div>
        </div>
    )
}