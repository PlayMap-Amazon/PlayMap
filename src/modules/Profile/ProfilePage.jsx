import styles from "./ProfilePage.module.css";
import common_styles from "../../App.module.css";
import TopBar from "../Topbar/Topbar";
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import StreakSection from "./StreakSection";
import LeaderBoard from "./LeaderBoard";
import LevelSection from "./LevelSection";

export default function ProfilePage() {


    return (
        <div className={styles.body}>
            <TopBar>
                <Link to="/">
                <button
                    className={common_styles.customButton}
                    style={{
                    color: '#C06D3E',
                    backgroundColor: '#F5E9E3',
                    borderColor: '#FB7E25',
                    }}
                >
                    Home
                </button>
                </Link>
            </TopBar>
            <div className={styles.profilePage}>
                <div className={styles.profileContainer}>
                    <img className={styles.profilePicture} src="profile_picture.png" alt="Profile" />
                    <p className={styles.userName}>Emma Smith</p>
                    <div className={styles.profileStats}>
                        <LevelSection />
                    </div>
                </div>
                
            </div>
            <StreakSection />
            <LeaderBoard />
            
        </div>

    );
}
