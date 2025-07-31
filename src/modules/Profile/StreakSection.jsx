import { Link } from 'react-router-dom';
import React, { useState } from "react";
import StreakCalendar from "./StreakCalendar.jsx";
import styles from "./StreakSection.module.css";

export default function StreakSection({studyDates, streak}) {

    const getFlameIcon = () => {
        if (streak === 0) return "streak1.png";
        if (streak <= 3) return "streak2.png";
        if (streak <= 7) return "streak3.png";
        if (streak <= 14) return "streak4.png";
        return "streak4.png";
    };


    return(
        <div className={styles.streakSection}>
            <StreakCalendar
                studyDates={studyDates}
            />
            <div className={styles.streakContainer}>
                <h3 className={styles.streakLabel}>Current Streak</h3>
                <div className={styles.flameWrapper}>
                    <img className={styles.flameIcon} src={getFlameIcon()} alt="Flame Icon" />
                    <span className={styles.streakValue}>{streak}</span>
                </div>
            </div>
        </div>
    )
}