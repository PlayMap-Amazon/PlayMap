import { Link } from 'react-router-dom';
import React, { useState } from "react";
import StreakCalendar from "./StreakCalendar.jsx";
import styles from "./StreakSection.module.css";

export default function StreakSection() {
    return(
        <div className={styles.streakSection}>
            <StreakCalendar
                streakDates={[
                    "2025-07-17",
                    "2025-07-18",
                    "2025-07-22",
                    "2025-07-23",
                    "2025-07-24",
                    "2025-07-25"
                ]}
            />
            <div className={styles.streakContainer}>
                <h3 className={styles.streakLable}>Max Streak</h3>
                <div className={styles.flameWrapper}>
                    <img className={styles.flameIcon} src="streak4.png" alt="Flame Icon" />
                    <span className={styles.streakValue}>9</span>
                </div>
                <h3>days</h3>
            </div>

            <div className={styles.streakContainer}>
                <h3 className={styles.streakLable}>Current Streak</h3>
                <div className={styles.flameWrapper}>
                    <img className={styles.flameIcon} src="streak2.png" alt="Flame Icon" />
                    <span className={styles.streakValue}>4</span>
                </div>
                <h3 >days</h3>
                <h3 className={styles.record}>Login 5 more days <br></br>to beat your record!</h3>
            </div>
        </div>
    )
}