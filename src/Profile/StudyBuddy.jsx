import styles from "./StudyBuddy.module.css";

export default function StudyBuddy() {
    return (
        <div className={styles.studyBuddyWrapper}>
            <div className={styles.title}>Study Buddy</div>
            <div className={styles.imgWrapper}>
                <img src="study_buddy.png" alt="Study Buddy Icon" className={styles.icon} />
            </div>
        </div>
    );
}