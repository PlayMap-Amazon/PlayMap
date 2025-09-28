import styles from "./Top3Section.module.css";

export default function Top3Section({ user }) {
    const topMindMaps = user?.topMindMaps || [];
    const topMinigameTopics = user?.topMinigameTopics || [];

    return (
        <section className={styles.top3FullSection}>
            <h2 className={styles.top3Title}>TOP 3</h2>
            <div className={styles.top3Columns}>
                <div className={styles.top3Column}>
                    <h3>MindMaps</h3>
                    <p className={styles.columnDescription}>
                        These are the mindmaps you've studied the most.
                    </p>
                    <div className={styles.table}>
                        {topMindMaps.slice(0, 3).map((map, index) => (
                            <div key={index} className={styles.tableRow}>
                                <div className={styles.tableRank}>{index + 1}</div>
                                <div className={styles.tableName}>{map.title}</div>
                                <div className={styles.tableCount}>{map.count} times</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.top3Column}>
                    <h3>Minigame Subjects</h3>
                    <p className={styles.columnDescription}>
                        These are the subjects you've practiced most through minigames.
                    </p>
                    <div className={styles.table}>
                        {topMinigameTopics.slice(0, 3).map((topic, index) => (
                            <div key={index} className={styles.tableRow}>
                                <div className={styles.tableRank}>{index + 1}</div>
                                <div className={styles.tableName}>{topic.topic}</div>
                                <div className={styles.tableCount}>{topic.count} times</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
