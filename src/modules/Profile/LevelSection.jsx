import styles from './LevelSection.module.css';

export default function LevelSection({ level, currentExp, nextLevelExp }) {
    
    const getLevelIcon = () => {
        if (level === 0) return "level1.png";
        if (level <= 3) return "level2.png";
        if (level <= 7) return "level3.png";
        if (level <= 10) return "level4.png";
        if (level <= 14) return "level5.png";
        return "level6.png";
    };

    const iconName = getLevelIcon();
    const isIcon5 = iconName === "level5.png";
    const isIcon6 = iconName === "level6.png";


    const percentage = (currentExp / nextLevelExp) * 100;

    return (
        <div className={styles.levelSection}>
            <h2 className={styles.levelTitle}>Level</h2>
            <div className={styles.badge}>
                <img className={`${styles.levelIcon} ${isIcon5 ||isIcon6 ? styles.levelIconBig : ''}`} src={getLevelIcon()} alt="Level Icon" />
                <span
                    className={`${styles.levelNumber} ${
                        isIcon5 ? 
                        styles.levelNumberLoweredBigger : 
                        isIcon6 ? 
                        styles.levelNumberBigger :
                        styles.levelNumberDefault}`}
                >
                    {level}
                </span>
            </div>

            <div className={styles.expBarWrapper}>
                <div className={styles.expBar}>
                    <div
                        className={styles.expBarFill}
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                <div
                    className={styles.expBubble}
                    style={{ left: `calc(${percentage}% - 45px)` }}
                >
                    {currentExp} / {nextLevelExp}
                </div>
            </div>
        </div>
    );
}
