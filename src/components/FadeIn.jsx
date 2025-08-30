import { useState, useEffect } from 'react'
import styles from './FadeIn.module.css'

export default function FadeIn({ children }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  return (
    <div className={`${styles.wrapper} ${visible ? styles.visible : ''}`}>
      {children}
    </div>
  )
}