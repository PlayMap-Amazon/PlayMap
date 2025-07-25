import React from 'react';
import styles from './LevelSection.module.css';

export default function LevelSection() {
    const currentExp = 320;
    const nextLevelExp = 500;
    const level = 7;

    return (
        <div className={styles.expBarWrapper}>
            <div className={styles.levelNumber}>
                Lv. {level}
            </div>
            <div className={styles.expBar}>
                <div
                    className={styles.expBarFill}
                    style={{ width: `${(currentExp / nextLevelExp) * 100}%` }}
                ></div>
                <div
                    className={styles.expBubble}
                    style={{ left: `calc(${(currentExp / nextLevelExp) * 100}% - 40px)` }}
                >
                    {currentExp} / {nextLevelExp}
                </div>
            </div>
        </div>
    );
}