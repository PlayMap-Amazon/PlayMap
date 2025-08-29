import React from "react";
import styles from "./Navbar.module.css";
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
          <Link to="/PlayMapDashBoard" className={styles.logoIcon}>
            <img src="/logo.png" alt="PlayMap Logo" />
          </Link>
          <span>PlayMap</span>

        <div className={styles.navLinks}>
          <a href="#" className={styles.navItem}>Stories</a>
          <Link to="/profile" className={styles.navItem}> My Profile</Link>
          <a href="#" className={styles.navItem}>Mindmaps</a>
          <a href="#" className={styles.navItem}>Games</a>
          <a href="#" className={styles.navItem}>Visual Quest</a>
        </div>
      </div>
    </nav>
  );
}
