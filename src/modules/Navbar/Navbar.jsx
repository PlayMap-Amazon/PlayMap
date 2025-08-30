import React from "react"
import styles from "./Navbar.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

export default function Navbar() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>

        <div className={styles.navLogo}>
          <Link to="/playmapdashboard" className={styles.logoIcon}>
            <img src="/logo.png" alt="PlayMap Logo" />
          </Link>
          <span>PlayMap</span>
        </div>

        <div className={styles.navLinks}>
          {loading ? (
            <span className={styles.navItem}>Loading</span>
          ) : user ? (
            <>
              <Link to="/profile" className={styles.navItem}> My Profile</Link>
              <a href="#" className={styles.navItem}>Stories</a>
              <a href="#" className={styles.navItem}>Mindmaps</a>
              <a href="#" className={styles.navItem}>Games</a>
              <a onClick={handleLogout} className={styles.navItem}>Log Out</a>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navItem}>
                Login
              </Link>
              <Link to="/register" className={styles.navItem}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
