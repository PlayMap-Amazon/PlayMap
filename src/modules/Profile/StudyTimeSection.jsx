import styles from './StudyTimeSection.module.css';
import { format, parseISO, isYesterday } from "date-fns";

export default function StudyTimeSection({ user }) {

    if (!user.studySessions || user.studySessions.length === 0) {
        return <div>No study sessions available.</div>;
    }

    const sortedSessions = user.studySessions
        .map(session => ({
            ...session,
            dateObj: parseISO(session.date)
        }))
        .sort((a, b) => b.dateObj - a.dateObj);

    const totalTime = sortedSessions.reduce((acc, session) => acc + session.hours, 0);
    const lastSession = sortedSessions[0];

    const lastDateDisplay = isYesterday(lastSession.dateObj)
        ? "Yesterday"
        : format(lastSession.dateObj, "MMMM d, yyyy");

    const maxTime = Math.max(...sortedSessions.map(s => s.hours));

    const motivationalMessage = `You studied for ${lastSession.hours} hour${lastSession.hours !== 1 ? 's' : ''} ${
        isYesterday(lastSession.dateObj)
            ? 'yesterday'
            : `on ${format(lastSession.dateObj, "MMMM d, yyyy")}`
    }! Want to beat that?`;


    return (
        <div className={styles.studyTimeContainer}>
            <h3 className={styles.title}>Study Time</h3>
            <p className={styles.description}>
                Track your study time and improve your learning habits.
            </p>

            <div className={styles.timeDisplay}>
                <span className={styles.timeLabel}>Total Study Time:</span>
                <span className={styles.timeValue}>{totalTime} hours</span>
            </div>

            <div className={styles.timeDisplay}>
                <span className={styles.timeLabel}>Max Study in One Day:</span>
                <span className={styles.timeValue}>{maxTime} hours</span>
            </div>

            <div className={styles.timeDisplay}>
                <span className={styles.timeLabel}>Last Session:</span>
                <span className={styles.timeValue}>
                    {lastSession.hours} hours — {lastDateDisplay}
                </span>
            </div>

            <div className={styles.motivationMessage}>
                {motivationalMessage}
            </div>

        </div>
    );
}