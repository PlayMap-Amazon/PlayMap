import React from "react"
import styles from "./Navbar.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { ArrowedButton } from "@/components/ui/button"

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
          <Link to="/profile" className={styles.logoIcon}>
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
              <Link to="/dashboard" className={styles.navItem}>Mindmaps</Link>
              <Link to="/games" className={styles.navItem}>Games</Link>
              <a onClick={handleLogout} className={styles.navItem}>Log Out</a>
            </>
          ) : (
            <>
                <ArrowedButton className='mr-5 border-2 border-[rgba(33,33,33,0.3)]' variant='outline' link='/login' unroundOnHover>Log in</ArrowedButton>
                <ArrowedButton className='border-2 border-[rgba(33,33,33,0.3)]' link='/register' unroundOnHover>Get started</ArrowedButton>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
