import { useAuth } from "@/AuthContext";
import styles from "./StudyBuddy.module.css";

export default function StudyBuddy() {
    const { user } = useAuth();
    console.log("Current user:", user);
    return (
        <div className={styles.studyBuddyWrapper}>
            <div className={styles.title}>Study Buddy</div>
            <div className={styles.imgWrapper}>
                <img src={`/${user.buddy}.png`} alt="Study Buddy Icon" className={styles.icon} />
            </div>
        </div>
    );
}